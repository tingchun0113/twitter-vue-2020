import { apiHelper } from './../utils/helpers'

export default {
  getUser ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserRepliedTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikedTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  getCurrentUser () {
    return apiHelper.get('/users/current')
  },
  getTopUsers () {
    return apiHelper.get('/users/top')
  },
  getFollowingUsers ({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers ({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  setAccount ({ userId, setting }) {
    return apiHelper.put(`/users/${userId}/account`, setting)
  },
  putProfile ({ userId, profile }) {
    return apiHelper.put(`/users/${userId}`, profile)
  }
}
