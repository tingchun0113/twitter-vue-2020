import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosPlugin from 'vue-axios-cors'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(AxiosPlugin)

Vue.use(
  new VueSocketIO({
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
    connection: 'https://twitter-socket-1.herokuapp.com'
  })
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
