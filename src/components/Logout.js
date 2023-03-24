import useToken from './UseToken';
import axios from 'axios';

const Logout = () => {
  const { removetoken } = useToken();
  // Logout function

  // eslint-disable-next-line no-unused-vars
  function logMeOut() {
    // uses axios post request to logout on server side
    axios({
      method: 'POST',
      url: '/logout',
    })
      .then(() => {
        // remove auth token so user cannot access data anymore
        removetoken();
        //navigate('/')
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  }

  /*return (
        <div className="Logout">
            {localStorage.getItem('token') !== null &&
                <button onClick={logMeOut}>Logout</button>
            }
        </div>
    );
    */
};

export default Logout;
