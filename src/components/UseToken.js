import { useState } from "react";

function useToken() {
    function getToken() {
        const userToken = localStorage.getItem('token');
        return userToken && userToken;
    };

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

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