import {
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc,
} from 'firebase/firestore';
import { db } from '../firebase';

// Constants
const notesInitData = {
  content: 'first note content',
  date: Date.now(),
  title: 'first note',
};

const gymLogInitData = {
  content: ['bench', 'pullup'],
  date: Date.now(),
  title: 'back',
};

const todoInitData = {
  content: 'go gym',
  date: Date.now(),
  completed: false,
};

// Common
export const autoAddDoc = async (userID) => {
  try {
    const todoDoc = await addDoc(collection(db, 'users', userID, 'todos'), todoInitData);
    const gymLogDoc = await addDoc(collection(db, 'users', userID, 'gym_log'), gymLogInitData);
    const notesDoc = await addDoc(collection(db, 'users', userID, 'notes'), notesInitData);
    console.log('Document written with ID: ', todoDoc.id, gymLogDoc.id, notesDoc.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
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
  const allNotesSnapshot = await getDocs(collectionRef);
  const data = allNotesSnapshot.docs.map((noteDoc) => {
    const dataItem = noteDoc.data();
    dataItem.id = noteDoc.id;
    return dataItem;
  });
  return data;
};

export const AddNoteForUser = async (userID, dataToAdd) => {
  const newDocRef = collection(db, 'users', userID, 'notes');
  const data = await addDoc(newDocRef, dataToAdd);
  return data.id;
};

export const UpdateNoteForUser = async (userID, docID, updateData) => {
  const docRef = doc(db, 'users', userID, 'notes', docID);
  await updateDoc(docRef, updateData);
};

export const DeleteNoteForUser = async (userID, docID) => {
  const docRef = doc(db, 'users', userID, 'notes', docID);
  await deleteDoc(docRef);
};

/// GymLog
export const retrieveGymLogForUser = async (userID) => {
  const collectionRef = collection(db, 'users', userID, 'gym_log');
  const data = await getDocs(collectionRef);
  console.log(data);
};
