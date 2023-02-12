// Component: Registration API
// This funtion passes user data into the 'users' table of the DB

export default class apiRegisterCall {
  static Register(body) {
    return fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then(console.log('Sent to backend:', body))
      .catch((error) => console.log(error))
  }
}
