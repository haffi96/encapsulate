import { db } from "../firebase";
import { collection, addDoc, getDocs, collectionGroup, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

// Constants
const notesInitData = {
  content: "first note content",
  date: "today",
  title: "first note"
};

const gymLogInitData = {
  content: ["bench", "pullup"],
  date: "today",
  title: "back"
};

const todoInitData = {
  content: "go gym",
  date: "today",
  completed: false,
}


// Create
export const autoAddDoc = async (userID) => {
    try {
        const todoRef = await addDoc(collection(db, "users", userID, "todos"), todoInitData);
        const gymLogRef = await addDoc(collection(db, "users", userID, "gym_log"), gymLogInitData);
        const notesRef = await addDoc(collection(db, "users", userID, "notes"), notesInitData);
        console.log("Document written with ID: ", todoRef.id, gymLogRef.id, notesRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}



export const retrieveAllDocs = async () => {
  // !! AVOID !!
  const collectionRef = collection(db, "users");
  const data = await getDocs(collectionRef)
  console.log(data)
}


export const retrieveAllDocsForUser = async (userID) => {
  const collectionRef = collection(db, "users", userID);
  const data = await getDocs(collectionRef)
  console.log(data)
}


export const retrieveCollectionGroup = async (auth) => {
  const userID = auth.currentUser.uid
  const allTodo = await getDocs(collectionGroup(db, "todo"))
  console.log(allTodo)
  console.log(userID)
}
/// Todos

export const retrieveTodosForUser = async (userID) => {
  const collectionRef = collection(db, "users", userID, "todos");
  const snapshot = await getDocs(collectionRef);
  const data = snapshot.docs.map((doc) => {
    const dataItem = doc.data()
    dataItem.id = doc.id
    return dataItem
  });
  console.log(data)
  return data;
}

export const AddTodoForUser = async (userID, dataToAdd) => {
  const collectionRef = collection(db, "users", userID, "todos");
  const data = await addDoc(collectionRef, dataToAdd)
}

export const UpdateTodoForUser = async (userID) => {
  const collectionRef = collection(db, "users", userID, "todos", docID);
  const data = await updateDoc(collectionRef)
  console.log(data)
}

export const DeleteTodoForUser = async (userID) => {
  const collectionRef = collection(db, "users", userID, "todos", docID);
  const data = await deleteDoc(collectionRef)
  console.log(data)
}

/// Notes
export const retrieveNotesForUser = async (userID) => {
  const collectionRef = collection(db, "users", userID, "notes");
  const data = await getDocs(collectionRef)
  console.log(data)
}


/// GymLog
export const retrieveGymLogForUser = async (userID) => {
  const collectionRef = collection(db, "users", userID, "gym_log");
  const data = await getDocs(collectionRef)
  console.log(data)
}

