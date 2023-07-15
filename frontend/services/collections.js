import {
    collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

// Constants
const notesInitData = {
    content: 'first note content',
    date: Date.now(),
    title: 'first note',
};

const gymLogInitData = (routineId) => ({
    routineName: 'Monday',
    routineId,
    created_at: Date.now(),
    updated_at: Date.now(),
});

const gymRoutinesInitData = {
    routineName: 'Monday',
    exercises: [
        {
            exerciseName: 'benchpress',
            sets: 5,
            reps: 5,
        },
        {
            exerciseName: 'inclidepress',
            sets: 5,
            reps: 5,
        },
    ],
    category: 'Chest',
};

const gymExercisesInitData = {
    Chest: ['benchpress', 'inclincepress'],
};

const todoInitData = {
    content: 'go gym',
    date: Date.now(),
    completed: false,
};

// Common
export const autoAddDoc = async (userID) => {
    try {
        await addDoc(collection(db, 'users', userID, 'todos'), todoInitData);
        const routineDoc = await addDoc(collection(db, 'users', userID, 'routines'), gymRoutinesInitData);
        await addDoc(collection(db, 'users', userID, 'gym_logs'), gymLogInitData(routineDoc.id));
        await addDoc(collection(db, 'users', userID, 'exercises'), gymExercisesInitData);
        addDoc(collection(db, 'users', userID, 'notes'), notesInitData);
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
    const collectionRef = collection(db, 'users', userID, 'gym_logs');
    const allWorkoutsSnapshot = await getDocs(collectionRef);
    const data = allWorkoutsSnapshot.docs.map((noteDoc) => {
        const dataItem = noteDoc.data();
        dataItem.id = noteDoc.id;
        return dataItem;
    });
    return data;
};

export const deleteWorkoutLogForUser = async (userID, docID) => {
    const docRef = doc(db, 'users', userID, 'gym_logs', docID);
    await deleteDoc(docRef);
};

// GymLog - Routines
export const retrieveAllGymLogRoutinesForUser = async (userID) => {
    const collectionRef = collection(db, 'users', userID, 'routines');
    const allRoutinesSnapshot = await getDocs(collectionRef);
    const data = allRoutinesSnapshot.docs.map((noteDoc) => {
        const dataItem = noteDoc.data();
        dataItem.id = noteDoc.id;
        return dataItem;
    });
    return data;
};

export const retrieveSingleGymRoutine = async (userID, routineId) => {
    const docRef = doc(db, 'users', userID, 'routines', routineId);
    const routineDocSnap = await getDoc(docRef);
    return routineDocSnap.data();
};
