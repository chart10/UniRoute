import { useState } from "react";

// retrieves token from local storage on browser
function useToken() {
    function getToken() {
        const userToken = localStorage.getItem('token');
        return userToken && userToken;
    };

    // token and setToken hook
    const [token, setToken] = useState(getToken());

    // saves authentication token to browser
    function saveToken(userToken) {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    // removes token from local storage
    // important for logging out!!!
    function removetoken() {
        localStorage.removeItem("token");
        setToken(null);
    };

    return {
        setToken: saveToken,
        token,
        removetoken
    };
}

export default useToken;