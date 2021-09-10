import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../actions";

export default function LogIn() {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    const tokenId = response.tokenId;

    dispatch(handleLogin(tokenId));
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Login With Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      prompt="consent"
    />
  );
}
