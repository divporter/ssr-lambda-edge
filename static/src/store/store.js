import Vue from 'vue'
import Vuex from 'vuex'

export function createStore () {

  return new Vuex.Store({
    // IMPORTANT: state must be a function so the module can be
    // instantiated multiple times
    state: () => ({
      animals: []
    }),

    mutations: {
      setItem (state, {key, value}) {
        Vue.set(state, key, value)
      }
    }
  })
}