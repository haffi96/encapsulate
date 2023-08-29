import {
    collection, getDocs, deleteDoc, doc, getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

/// Todos
export const retrieveTodosForUser = async (authToken) => {
    const response = await fetch(`${API_URL}todos/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
    const data = await response.json();
    return data;
};

export const AddTodoForUser = async (authToken, dataToAdd) => {
    const response = await fetch(`${API_URL}todos/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(dataToAdd),
    });
    const data = await response.json();
    return data;
};

export const UpdateTodoForUser = async (authToken, todoUuid, updateData) => {
    const response = await fetch(`${API_URL}todos/${todoUuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updateData),
    });
    await response.json();
};

export const DeleteTodoForUser = async (authToken, todoUuid) => {
    await fetch(`${API_URL}todos/${todoUuid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
};

/// Notes
export const retrieveNotesForUser = async (authToken, noteLimit) => {
    const limit = noteLimit || 20;

    const response = await fetch(`${API_URL}notes/?skip=0&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
    const data = await response.json();
    return data;
};

export const AddNoteForUser = async (authToken, dataToAdd) => {
    await fetch(`${API_URL}notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(dataToAdd),
    });
};

export const UpdateNoteForUser = async (authToken, noteUuid, updateData) => {
    const response = await fetch(`${API_URL}notes/${noteUuid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updateData),
    });
    const data = await response.json();
    return data;
};

export const DeleteNoteForUser = async (authToken, noteUuid) => {
    const resp = await fetch(`${API_URL}notes/${noteUuid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
    const respBody = await resp.text();
    console.log(respBody);
};

/// GymLog
export const retrieveGymLogEntriesForUser = async (authToken) => {
    const resp = await fetch(`${API_URL}gym_log/entries/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
    const data = await resp.json();
    console.log(data);
    return data;
};

export const deleteWorkoutLogEntryForUser = async (authToken, gymLogEntryUuid) => {
    await fetch(`${API_URL}gym_log/entries/${gymLogEntryUuid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
};

// GymLog - Routines
export const retrieveAllGymLogRoutinesForUser = async (authToken) => {
    const response = await fetch(`${API_URL}gym_log/routines/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
    });
    const data = await response.json();
    console.log(data);
    return data;
};

export const retrieveSingleGymRoutine = async (userID, routineId) => {
    const docRef = doc(db, 'users', userID, 'routines', routineId);
    const routineDocSnap = await getDoc(docRef);
    return routineDocSnap.data();
};

// GymLog - Exercises
export const retrieveExercisesBySlugs = async (exerciseSlugs) => {

};
