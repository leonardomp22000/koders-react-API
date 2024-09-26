const API_URL = "https://koders-list-api.vercel.app";

export function getKoders() {
  return fetch(`${API_URL}/koders`)
    .then((response) => response.json())
    .then((data) => data.koders);
}
export function createKoder({ firstName, lastName, email }) {
  return fetch(`${API_URL}/koders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
    }),
  });
}

export function deleteKoder(koderId) {
  return (fetch(`${API_URL}/koders/${koderId}/delete`, 
    { method: "POST" 

    }));
}

// `${API_URL}/koders${koderId}/delete`
// https://koders-list-api.vercel.app/koders/6674f66d91b8f16085e4aad6/delete