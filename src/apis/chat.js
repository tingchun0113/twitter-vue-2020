import { apiHelper } from './../utils/helpers'

export default {
  getPublicChat () {
    return apiHelper.get('/chat/public')
  }
}
