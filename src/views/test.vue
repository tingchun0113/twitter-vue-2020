<template>
  <form @submit.stop.prevent="sendMessage">
    <input type="text" v-model="message" placeholder="請輸入訊息......" />
    <button type="submit">button</button>
  </form>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  data () {
    return {
      message: "12345",
      messages: []
    }
  },
  created(){
    this.sendMessage ()

    console.log(this.currentUser.id, this.message)

    this.receiveMessages ()
  },
  methods: {
    sendMessage () {
      this.$socket.emit('public', {
        text: this.message,
        userId: this.currentUser.id,
      })
      console.log('sent')
    },
    receiveMessages () {
      this.sockets.subscribe('public', (data) => {
        console.log(data)
        this.messages.push({
          id: data.id,
          message: data.message,
          time: data.time,
          userId: data.userId,
          name: data.name,
          avatar: data.avatar
        })
        console.log(this.messages)
      })
    }
  },
}
</script>
