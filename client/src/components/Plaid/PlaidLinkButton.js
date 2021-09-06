import React, { useState, useEffect } from "react";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { savePlaidCredentials } from "../../actions";

export default function PlaidLinkButton() {
  const [token, setToken] = useState(null);
  const googleID = useSelector((state) => state.user?.googleId);

  const dispatch = useDispatch();

  // generate a link_token
  useEffect(() => {
    async function createLinkToken() {
      let response = await axios.post("/api/create_link_token", { googleID });
      const link_token = response.data;
      setToken(link_token);
    }
    createLinkToken();
  }, [setToken, googleID]);

  const onSuccess = async (public_token, metadata) => {
    // send public_token to server
    const response = await axios.post("/api/exchange_public_token", {
      public_token: public_token,
    });
    const plaidAccessToken = response.data.accessToken;
    const plaidItemID = response.data.itemID;
    const bankAccountInfo = {
      account: metadata.account,
      account_id: metadata.account_id,
      accounts: metadata.accounts,
      institution: metadata.institution,
    };

    dispatch(
      savePlaidCredentials(
        googleID,
        plaidAccessToken,
        plaidItemID,
        bankAccountInfo
      )
    );
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
