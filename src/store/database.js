import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
const { FieldValue } = firebase.firestore;

Vue.use(firestorePlugin);
firebase.initializeApp({
 projectId: 'kt-test-40794', 
 databaseURL: 'https://kt-test-40794.firebaseio.com'
})

export const db = firebase.firestore();
export { FieldValue };