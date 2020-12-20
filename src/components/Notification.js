import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.msgR);

  if (message === null) {
    return null;
  }
  if (message === "Item is sold out" || message === "Something went wrong. Try later") {
    return <div className="messageError">{message}</div>;
  } else {
    return <div className="message">{message}</div>;
  }
};

export default Notification;