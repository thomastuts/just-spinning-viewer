import React from "react";

import "./UserInput.scss";
import TypingIndicator from "../TypingIndicator/TypingIndicator.js";

const UserInput = ({ avatar, displayName, message, hideMessage }) => {
  let messageContent = null;

  if (!message) {
    messageContent = <TypingIndicator />;
  } else if (hideMessage) {
    messageContent = (
      <div
        className="user-input__hidden-message"
        style={{ width: `${message.length}vw` }}
      />
    );
  } else {
    messageContent = message;
  }

  return (
    <div className="user-input">
      <img src={avatar} alt="" className="user-input__image" />
      <div className="user-input__content">
        <div className="user-input__display-name">{displayName}</div>
        <div className="user-input__message">{messageContent}</div>
      </div>
    </div>
  );
};

export default UserInput;
