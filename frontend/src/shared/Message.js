import React from "react";
import styled from "styled-components";
const UserMessage = styled.div`
  position: absolute;
  padding: 1rem 3rem;
  background-color: ${(props) => props.color || "red"};
  z-index: 100;
  font-size: 1.1rem;
  border-radius: 10px;
`;
export function Message({ color, messagetext }) {
  const colordecipher = (color) => {
    return color === "warning"
      ? "#FFCCCC"
      : color === "success"
      ? "#42ba96"
      : "whitesmoke";
  };
  return <UserMessage color={colordecipher(color)}>{messagetext}</UserMessage>;
}
