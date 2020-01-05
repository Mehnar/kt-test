import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import mutations from './mutations';
import getters from './getters';
import actions from './actions';
import Task from './Task';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isEditorOpened: false,
    editorPosition: 'down',
    orderOfSorting: 'asc',
  },
  getters,
  mutations,
  actions,
  modules: {
    Task,
  },
  plugins: [
    createPersistedState({
      reducer: state => ({
        isEditorOpened: state.isEditorOpened,
        editorPosition: state.editorPosition,
        orderOfSorting: state.orderOfSorting,
      })
    })
  ]
})
