<template>
  <div id="follow">
    <div class="links">
      <a @click="$router.go(-1)">←</a>
      <div :class="{filter:filter}" @click="fetchFollowingUsers(userId)">Following</div>
      <div :class="{filter:!filter}" @click="fetchFollowers(userId)">Followers</div>
    </div>
    <Spinner v-if="isLoading" />

    <div
      class="cards"
      v-for="tweet in tweets"
      :key="tweet.followingId">
      <div class="left">
        <router-link :to="{ name: 'others', params: { id: tweet.followingId | tweet.followerId } }">
          <img class="avatar" :src="tweet.avatar | emptyImage">
        </router-link>
      </div>
      <div class="right">
        <router-link :to="{ name: 'others', params: { id: tweet.followingId | tweet.followerId  } }">
          <h5 class="info">{{ tweet.name }}
            <div>@{{ tweet.account }}</div>
          </h5>
        </router-link>
        <p class="article">{{ tweet.introduction }}</p>
      </div>
      <div class="switch">
        <div class="on" v-show="tweet.isFollowed && currentUser.id == userId" @click="handleUnfollow(tweet.followingId || tweet.followerId)">Unfollow</div>
        <div class="off" v-show="!tweet.isFollowed && currentUser.id == userId" @click="handleFollow(tweet.followerId)">Follow</div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'
import usersAPI from './../apis/users'
import followApi from '../apis/followships'
import { Toast } from './../utils/helpers'
import Spinner from './../components/spinner'
import { mapState } from 'vuex'

export default {
  mixins: [emptyImageFilter],
  components: {
    Spinner
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  data(){
    return{
      filter: true,
      tweets: [],
      userId: -1,
      isLoading: true,
      isClickedFollow: false,
      isClickedUnfollow: false
    }
  },
  created () {
    const { id: userId } = this.$route.params
    this.fetchFollowingUsers (userId)
    this.userId = userId
  },
  beforeRouteUpdate (to, from, next) {
    const { id: userId } = to.params
    this.fetchFollowingUsers (userId)
    this.userId = userId
    next()
  },
  methods: {
    async fetchFollowingUsers (userId) {
      this.filter = true
      try {
        this.isLoading = true
        const data = await usersAPI.getFollowingUsers({ userId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = data.data
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: 'Cannot get users. Please wait for a moment'
        })
        console.error(error.message)
      }
    },
    async fetchFollowers (userId) {
      this.filter = false
      try {
        this.isLoading = true
        const data = await usersAPI.getFollowers({ userId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = data.data
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: 'Cannot get followers. Please wait for a moment'
        })
        console.error(error.message)
      }
    },
    async handleFollow(id) {
      try {
         if (this.isClickedFollow) {
          return
        }
        this.isClickedFollow = true

        const data = await followApi.followUser({ id: id.toString() })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: 'Following this user'
        })
        const index = this.tweets.findIndex(followship => followship.followerId === id)
        this.tweets[index].isFollowed = true
        this.isClickedFollow = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Failed to follow. Please wait for a moment'
        })
        this.isClickedFollow = false
        console.error(error.message)
      }
    },
    async handleUnfollow (id) {
      try {
         if (this.isClickedUnfollow) {
          return
        }
        this.isClickedUnfollow = true

        const data = await followApi.cancelFollow({ followingId: id.toString() })
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: 'Unfollowed this user'
        })
        const index = this.tweets.findIndex(followship => followship.followingId === id || followship.followerId === id)
        this.tweets[index].isFollowed = false
        if (this.tweets[index].followingId) { // update following user list
          this.tweets.splice(index, 1)
        }
        this.isClickedUnfollow = false
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'Failed to unfollow. Please wait for a moment'
        })
        this.isClickedUnfollow = false
      }
    }
  }
}
</script>

<style lang="sass">
$font-color: rgba(#b0d7f6, .8)
#follow
  padding: 10px
  overflow-x: hidden
  overflow-y: auto
  .links
    display: grid
    grid-template:
      columns: repeat(3, 1fr)
    width: 250px
    a
      font-size: 24px
    div
      text-align: center
      padding: 10px 0
    &:hover
      cursor: pointer
    .filter
      border-bottom: 5px solid $font-color
  .cards
    width: 100%
    display: flex
    border-radius: 10px
    background-color: #f1f7fd
    margin: 20px 0
    padding:
      top: 20px
      bottom: 15px
    position: relative
    .left
      padding: 0 10px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50px
        background-color: grey
        object-fit: cover
    .right
      .info
        &:hover
          text-decoration: underline
        div
          color: grey
      .article
        margin:
          top: 10px
        white-space: normal
    .switch
      position: absolute
      top: 10px
      right: 20px
      div
        text-align: center
        padding: 5px 10px
        border-radius: 10px
        &:hover
          cursor: pointer
      .on
        background:
          color: $font_color
      .off
        color: $font_color
        border: 2px solid $font_color
</style>
