// Component: Registration API
// This funtion passes user data into the 'users' table of the DB

export default class apiRegister {
  static Register(body) {
    return fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(console.log(body))
      .then((response) => response.json())
      .catch((error) => console.log(error))
  }
}
