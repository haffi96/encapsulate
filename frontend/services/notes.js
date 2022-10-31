import { API_URL } from "@env";

const URL_PREFIX = `${API_URL}/notes`;

export const getAllNotes = async (userID) => {
  const notes = await fetch(`${URL_PREFIX}/${userID}`).then((response) =>
    response.json()
  );
  return notes;
};

export const createNote = async (userID, newNoteData) => {
  console.log(userID, newNoteData);
  data = {
    account_user_id: userID,
    title: newNoteData.title,
    body: newNoteData.body,
  };

  const notes = await fetch(`${URL_PREFIX}/new_note`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    json: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return notes;
};

export const deleteNoteReq = async (note_uuid) => {
  const notes = await fetch(`${URL_PREFIX}/${note_uuid}`, {
    method: "DELETE",
  }).then((response) => response.json());

  return notes;
};

export const updateNoteReq = async (noteData) => {
  let updateAt = new Date(Date.now()).toISOString().slice(0, -1);
  data = {
    title: noteData.title,
    body: noteData.body,
    updated_at: updateAt,
  };

  const notes = await fetch(`${URL_PREFIX}/${noteData.note_uuid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return notes;
};
