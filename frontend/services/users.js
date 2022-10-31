import { API_URL } from "@env";

const URL_PREFIX = `${API_URL}/accounts`;

export const registerWithEmailAndPassword = async (email, password) => {
  data = {
    email: email,
    pwd: password,
  };

  const user = await fetch(`${URL_PREFIX}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

  return user;
};

export const loginWithEmailAndPassword = async (email, password) => {
  data = {
    email: email,
    pwd: password,
  };

  const user = await fetch(`${URL_PREFIX}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return user;
};
