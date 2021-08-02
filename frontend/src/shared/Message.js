import React from "react";
import styled from "styled-components";
const UserMessage = styled.div`
  position: absolute;
  padding: 1rem 3rem;
  background-color: ${(props) => props.color || "red"};
  z-index: 100;
  font-size: 1.1rem;
  border-radius: 10px;
  display: ${(props) => (props.visible ? "block" : "none")};
`;
export function Message({ color, messagetext, visible }) {
  const colordecipher = (color) => {
    return color === "warning"
      ? "#FFCCCC"
      : color === "success"
      ? "#42ba96"
      : "whitesmoke";
  };
  return (
    <UserMessage data-tetsid="Message_container" visible={visible} color={colordecipher(color)}>
      {messagetext}
    </UserMessage>
  );
}
