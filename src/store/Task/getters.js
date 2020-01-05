import * as types from '../types';
import { removeLocalNamespaces, MAX_PAGE_SIZE } from '@/utils';

const localTypes = removeLocalNamespaces(types);

export default {
  [localTypes.GET_SHOWING_TASKS]: (state) => (page, orderOfSorting) => {
    const startIndex = (page - 1) * MAX_PAGE_SIZE;
    if (orderOfSorting === 'asc') {
      return state.allTasks.slice(startIndex, startIndex + MAX_PAGE_SIZE);
    }
    if (orderOfSorting === 'desc') {
      return [...state.allTasks].reverse().slice(startIndex, startIndex + MAX_PAGE_SIZE);
    }
  }
};
