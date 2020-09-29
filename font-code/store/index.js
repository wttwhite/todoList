import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
export default new vuex.Store({
  state: {
    color: 'yellow',
    customStr: 'customStr'
  },
  getters: {
    customStrGetter (state) {
      return state.customStr.substr(1, 4)
    }
  },
  mutations: {
    changeColor (state, data) {
      state.color = data
    }
  }
})