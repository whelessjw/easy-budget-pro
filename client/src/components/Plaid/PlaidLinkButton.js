import React, { useCallback, useState } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";

export default function PlaidLinkButton() {
  const [token, setToken] = useState(null);

  // generate a link_token
  React.useEffect(() => {
    async function createLinkToken() {
      let response = await axios.post(
        "http://localhost:8000/api/create_link_token"
      );
      const link_token = response.data;
      setToken(link_token);
    }
    createLinkToken();
  }, [setToken]);

  // const handler = plaid.create({
  //   token: token,
  //   onSuccess: async (publicToken, metadata) => {
  //     console.log(publicToken);
  //     console.log(metadata);
  //     await axios.post("/api/exchange_public_token", publicToken);
  //   },
  // });

  const onSuccess = (public_token, metadata) => {
    // send public_token to server
    console.log(public_token);
    console.log(metadata);
    axios.post("http://localhost:8000/api/exchange_public_token", {
      public_token: public_token,
    });
  };

  // The pre-built PlaidLink component uses the usePlaidLink hook under the hood.
  // It renders a styled button element and accepts a `className` and/or `style` prop
  // to override the default styles. It accepts any Link config option as a prop such
  // as receivedRedirectUri, onEvent, onExit, onLoad, etc.
  return token === null ? (
    // insert your loading animation here
    <div className="loader"></div>
  ) : (
    <PlaidLink
      token={token}
      onSuccess={onSuccess}
      // onExit={...}
      // onEvent={...}
    >
      Connect a bank account
    </PlaidLink>
  );
}
