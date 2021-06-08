<template>
  <div id="chatModal">
    <div id="rooms">
      <h5>Chats</h5>
      <Spinner v-if="isLoading" />
      <div class="room" v-for="user in onlineUsers" :key="user.id">
        <img class="avatar" :src="user.avatar | emptyImage" alt="avatar">
        <div class="name">{{user.name}}</div>
      </div>
    </div>
    <div id="chatting">
      <Spinner v-if="isLoading" />
      <div class="message" v-for="message in messages" :key="message.id">
        <img class="avatar" :src="message.avatar | emptyImage" alt="avatar"
          v-if="message.userId !== currentUser.id">
        <div class="right" :class="{currentUser: message.userId === currentUser.id}">
          <div class="msg" >{{message.message}}</div>
          <div class="time">{{message.time | fromNow }}</div>
        </div>
      </div>
      <form @submit.stop.prevent="sendMessage">
        <input type="text" v-model="message" placeholder="Aa">
        <button>
          <img src="../../public/images/send.png" alt="send">
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { emptyImageFilter, fromNowFilter } from './../utils/mixins'
import Spinner from './../components/spinner'
import { Toast } from '../utils/helpers'
import chatAPI from './../apis/chat'

export default {
  mixins: [emptyImageFilter, fromNowFilter],
  components: {
    Spinner
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  created () {
    this.joinChatRoom()

    this.sockets.subscribe('public-room-online', (data) => {
        this.onlineUsers = data.onlineUsers
    })
    this.getChatRoomUsers()

    this.sockets.subscribe('public', (data) => {
        this.messages.push({
          id: data.id,
          message: data.message,
          time: data.time,
          userId: data.userId,
          name: data.name,
          avatar: data.avatar
        })
    }),
    this.fetchMessages()
  },
  data () {
    return {
      message: "",
      messages: [],
      isLoading: true,
      onlineUsers: [],
    }
  },
  methods: {
    joinChatRoom () {
      this.$socket.emit('public-room-online',
        this.currentUser.id,
      )
    },
    sendMessage () {
      if (!this.message.trim()) {
        Toast.fire({
          icon: "warning",
          title: "No message typed in chat"
        })
        this.message = ""
        return
      } else {
        this.$socket.emit('public', {
          text: this.message,
          userId: this.currentUser.id,
        })
        this.message = ""
      }
    },
    async getChatRoomUsers () {
      try {
        this.isLoading = true
        const data = await chatAPI.getOnlineUsers()

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.onlineUsers = data.data
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.error(error.message)
      }
    },
    async fetchMessages () {
      try {
        this.isLoading = true
        const data = await chatAPI.getPublicChat()

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        const messagesData = data.data
        messagesData.map(d => {
          this.messages.push({
            id: d.id,
            message: d.message,
            time: d.createdAt,
            userId: d.userId,
            name: d.name,
            avatar: d.avatar
          })
        })
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: 'Cannot get messages. Please wait for a moment'
        })
        console.error(error.message)
      }
    }
  }
}
</script>

<style lang="sass">
#chatModal
  display: grid
  grid-template-columns: 30vw 50vw
  height: 100vh
  overflow: hidden
  #rooms
    margin-top: 10px 0
    background-color: #f1f7fd
    border-radius: 10px
    height: 100%
    h5
      font-size: 24px
      margin: 10px
    .room
      display: flex
      border: 1px solid rgba(grey,0.2)
      &:hover
        cursor: pointer
      .avatar
        width: 50px
        height: 50px
        border-radius: 50px
        background-color: grey
        margin: 10px
      .name
        line-height: 70px
  #chatting
    overflow-y: auto
    padding-bottom: 40px
    .message
      display: flex
      padding: 10px
      padding-left: 0px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50px
        background-color: grey
        margin: 10px
      .right
        width: 100%
        display: flex
        flex-flow: column nowrap
        align-items: flex-start
        .msg
          background-color: #f1f7fd
          padding: 10px
          border-radius: 30px 30px 30px 0
          white-space: normal
          max-width: 60%
        .time
          font-size: 12px
          color: grey
        &.currentUser
          align-items: flex-end
          .msg
            border-radius: 30px 30px 0 30px
    form
      position: fixed
      bottom: 0
      right: 0
      padding: 10px
      display: flex
      align-items: center
      background-color: #fff
      input
        width: 40vw
        line-height: 30px
        padding-left: 10px
        border-radius: 30px
      button
        bottom: 0
        right: 0
        background: none
        border: none
        img
          width: 30px
</style>
