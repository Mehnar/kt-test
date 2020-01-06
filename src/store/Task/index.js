import mutations from './mutations';
import getters from './getters';
import actions from './actions';
export default {
  namespaced: true,
  state: {
    editorText: '',
    allTasks: [],
    countOfTasks: 0,
    currentTask: {},
    tasks: [],
  },
  getters,
  mutations,
  actions,
}