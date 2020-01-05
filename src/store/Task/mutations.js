import * as types from '../types';
import { removeLocalNamespaces } from '@/utils';

const localTypes = removeLocalNamespaces(types);
export default {
  [localTypes.SET_EDITOR_TEXT](state, val) {
    state.editorText = val;
  },
  [localTypes.SET_TASKS](state, val) {
    state.allTasks = val;
  },
  [localTypes.SET_COUNT_OF_TASKS](state, val) {
    state.countOfTasks = val;
  },
  [localTypes.SET_CURRENT_TASK](state, val) {
    state.currentTask = val;
  },
};
