import { apiHelperChat } from './../utils/helpers'

export default {
  getPublicChat () {
    return apiHelperChat.get('/chat/public')
  }
}
