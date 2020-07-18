import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);

import {createStore} from './store/store'

export function createApp(context){

  const store = createStore();

  const app = new Vue({
    store,
    components: {
      App
    },
    render: h => h(App)
  })
  return { app, store }
}
