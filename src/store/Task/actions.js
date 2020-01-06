import * as types from '../types';
import { removeLocalNamespaces } from '@/utils';
import { db, Timestamp } from '../database';
import { firestoreAction } from 'vuexfire'

const localTypes = removeLocalNamespaces(types);

export default {
  [localTypes.BIND_TASKS]: firestoreAction(({ bindFirestoreRef }) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('tasks', db.collection('tasks'))
  }),
  [localTypes.CREATE_TASK]: firestoreAction((ctx, text) => {
    return db.collection('tasks').add({
      text,
      completed: false,
      createdAt: Timestamp.fromDate(new Date),
    });
  }),
  [localTypes.DELETE_TASK]: firestoreAction((ctx, id) => {
    return db.collection('tasks').doc(id).delete();
  }),
  [localTypes.UPDATE_TASK]: firestoreAction((ctx, { id, task }) => {
    return db.collection('tasks').doc(id).update(task);
  }),
  [localTypes.UPDATE_TASK_STATUS]: firestoreAction((ctx, { id, status }) => {
    return db.collection('tasks').doc(id).update({ completed: status });
  }),
};
