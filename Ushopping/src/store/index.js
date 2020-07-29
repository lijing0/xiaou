import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
store.subscribe(function(mutations, state){
    localStorage.setItem("ugoods", JSON.stringify(state.cartGoods))
});
export default store;