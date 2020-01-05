import * as types from '../types';
import { removeLocalNamespaces } from '@/utils';
import { db, FieldValue } from '../database';

const localTypes = removeLocalNamespaces(types);

export default {
  async [localTypes.FETCH_ALL_TASKS]({ commit, getters, rootState }, page) {
    const querySnapshot = await db.collection('tasks').orderBy('createdAt').get();
    const data = querySnapshot.docs.map((doc, index) => ({
      ...doc.data(),
      id: doc.id,
      index: index + 1,
    }));
    commit(localTypes.SET_COUNT_OF_TASKS, data.length);
    commit(localTypes.SET_TASKS, data);
    return getters[localTypes.GET_SHOWING_TASKS](page, rootState.orderOfSorting);
  },
  async [localTypes.FETCH_TASK_BY_ID]({ commit }, id) {
    const snapshot = await db.collection('tasks').doc(id).get();
    const data = snapshot.data();
    if (!data) {
      commit(localTypes.SET_CURRENT_TASK, {});
      return data;
    } else {
      const modifiedData = { ...snapshot.data(), id: snapshot.id }
      commit(localTypes.SET_CURRENT_TASK, modifiedData);
      return modifiedData;
    }
  },
  async [localTypes.CREATE_TASK](ctx, text) {
    await db.collection('tasks').add({
      text,
      completed: false,
      createdAt: FieldValue.serverTimestamp(),
    });
  },
  async [localTypes.DELETE_TASK](ctx, id) {
    return db.collection('tasks').doc(id).delete();
  },
  async [localTypes.UPDATE_TASK](ctx, { id, task }) {
    return db.collection('tasks').doc(id).update(task);
  },
  async [localTypes.UPDATE_TASK_STATUS](ctx, { id, status }) {
    return db.collection('tasks').doc(id).update({ completed: status });
  }
}