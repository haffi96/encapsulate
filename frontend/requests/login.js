export async function login(email) {
    const resp = await fetch('http://10.62.71.138:8001/users/', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'email': email
      },
    });
    const data = JSON.stringify(resp.status);
    return data
  }