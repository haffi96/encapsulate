import {
  collection, addDoc, getDocs, collectionGroup, updateDoc, deleteDoc, setDoc, doc,
} from 'firebase/firestore';
import { db } from '../firebase';

// Constants
const notesInitData = {
  content: 'first note content',
  date: 'today',
  title: 'first note',
};

const gymLogInitData = {
  content: ['bench', 'pullup'],
  date: 'today',
  title: 'back',
};

const todoInitData = {
  content: 'go gym',
  date: 'today',
  completed: false,
};

const userInitDate = {
  date: Date.now(),
};

// Create
export const autoAddDoc = async (userID) => {
  try {
    const newUserDoc = await setDoc(doc(db, 'users', userID), userInitDate);
    console.log(newUserDoc);
    const todoDoc = await addDoc(collection(db, 'users', userID, 'todos'), todoInitData);
    const gymLogDoc = await addDoc(collection(db, 'users', userID, 'gym_log'), gymLogInitData);
    const notesDoc = await addDoc(collection(db, 'users', userID, 'notes'), notesInitData);
    console.log('Document written with ID: ', todoDoc.id, gymLogDoc.id, notesDoc.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const retrieveAllDocs = async () => {
  // !! AVOID !!
  const collectionRef = collection(db, 'users');
  const data = await getDocs(collectionRef);
  console.log(data);
};

export const retrieveAllDocsForUser = async (userID) => {
  const collectionRef = collection(db, 'users', userID);
  const data = await getDocs(collectionRef);
  console.log(data);
};

export const retrieveCollectionGroup = async (auth) => {
  const userID = auth.currentUser.uid;
  const allTodo = await getDocs(collectionGroup(db, 'todo'));
  console.log(allTodo);
  console.log(userID);
};

/// Todos
export const retrieveTodosForUser = async (userID) => {
  const collectionRef = collection(db, 'users', userID, 'todos');
  const allTodosSnapshot = await getDocs(collectionRef);
  const data = allTodosSnapshot.docs.map((todoDoc) => {
    const dataItem = todoDoc.data();
    dataItem.id = todoDoc.id;
    return dataItem;
  });
  return data;
};

export const AddTodoForUser = async (userID, dataToAdd) => {
  const newDocRef = collection(db, 'users', userID, 'todos');
  const data = await addDoc(newDocRef, dataToAdd);
  return data.id;
};

export const UpdateTodoForUser = async (userID, docID, updateData) => {
  const docRef = doc(db, 'users', userID, 'todos', docID);
  await updateDoc(docRef, updateData);
};

export const DeleteTodoForUser = async (userID, docID) => {
  const docRef = doc(db, 'users', userID, 'todos', docID);
  await deleteDoc(docRef);
};

/// Notes
export const retrieveNotesForUser = async (userID) => {
  const collectionRef = collection(db, 'users', userID, 'notes');
  const data = await getDocs(collectionRef);
  console.log(data);
};

/// GymLog
export const retrieveGymLogForUser = async (userID) => {
  const collectionRef = collection(db, 'users', userID, 'gym_log');
  const data = await getDocs(collectionRef);
  console.log(data);
};
