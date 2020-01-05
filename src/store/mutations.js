import * as types from './types';
import { removeLocalNamespaces } from '@/utils';

const localTypes = removeLocalNamespaces(types);

export default {
  [localTypes.SET_EDITOR_STATUS](state, val) {
    state.isEditorOpened = val;
  },
  [localTypes.SET_EDITOR_POSITION](state, val) {
    state.editorPosition = val;
  },
  [localTypes.SET_ORDER_OF_SORTING](state, val) {
    state.orderOfSorting = val;
  },
}
