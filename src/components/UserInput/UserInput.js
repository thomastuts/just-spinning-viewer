import React from "react";

import LikeImage from "../../images/like.png";
import "./UserInput.scss";
import TypingIndicator from "../TypingIndicator/TypingIndicator.js";

const UserInput = ({
  avatar,
  displayName,
  message,
  hideMessage,
  votes,
  showVotes,
}) => {
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
      <div className="user-input__image-container">
        <img src={avatar} alt="" className="user-input__image" />
        {showVotes && (
          <div className="user-input__votes">
            <img src={LikeImage} alt="" className="user-input__like-icon" />
            <span>{votes}</span>
          </div>
        )}
      </div>
      <div className="user-input__content">
        <div className="user-input__display-name">{displayName}</div>
        <div className="user-input__message">{messageContent}</div>
      </div>
    </div>
  );
};

export default UserInput;
