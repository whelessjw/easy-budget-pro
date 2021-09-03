import React from "react";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../actions";

export default function LogOut() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(handleLogout());
  };

  return (
    <button onClick={handleClick} type="button" className="btn btn-light">
      Log Out
    </button>
  );
}
