import * as types from '../types';
import { removeLocalNamespaces, MAX_PAGE_SIZE } from '@/utils';

const localTypes = removeLocalNamespaces(types);

export default {
  [localTypes.GET_SHOWING_TASKS]: state => (page, orderOfSorting) => {
    const startIndex = (page - 1) * MAX_PAGE_SIZE;
    if (orderOfSorting === 'asc') {
      const tasks = [...state.tasks].sort((a, b) => {
        return b.createdAt.seconds - a.createdAt.seconds;
      });
      return tasks.slice(startIndex, startIndex + MAX_PAGE_SIZE);
    }
    if (orderOfSorting === 'desc') {
      const tasks = [...state.tasks].sort((a, b) => {
        return a.createdAt.seconds - b.createdAt.seconds;
      });
      return tasks.slice(startIndex, startIndex + MAX_PAGE_SIZE);
    }
  },
  [localTypes.GET_TASK_BY_ID]: state => (id) => {
    return state.tasks.find(task => task.id === id);
  }
};
