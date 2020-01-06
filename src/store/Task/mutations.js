import * as types from '../types';
import { removeLocalNamespaces } from '@/utils';

const localTypes = removeLocalNamespaces(types);
export default {
  [localTypes.SET_EDITOR_TEXT](state, val) {
    state.editorText = val;
  },
  [localTypes.SET_CURRENT_TASK](state, val) {
    state.currentTask = val;
  },
};
