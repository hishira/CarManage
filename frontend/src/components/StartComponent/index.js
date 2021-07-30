import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { MainComponent, MainText } from "../../shared/CSSComponents";
const WrapperComponent = styled(MainComponent)`
  width: 100%;
  @media (min-width: 500px) {
    width: 50%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  border: 2px solid red;
  width: 50%;
`;
const ButtonText = styled.p`
  margin-top: 2rem;
  font-size: 1.7rem;
`;
const Button = styled.button`
  padding: 1rem 1.5rem;
  border-radius: 10px;
  width: 10rem;
  border: 0.1rem solid slategray;
  font-size: 1.1rem;
  &:last-child {
    margin-top: 1rem;
  }
  &:hover {
    cursor: pointer;
    background-color: #fca311;
  }
`;
export default function StartComponent() {
  const history = useHistory();
  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("user"));
    console.log(item);
    if (item !== null) history.push("/store");
  });
  return (
    <MainComponent>
      <WrapperComponent>
        <MainText>Welcome</MainText>
        <ButtonGroup>
          <Button onClick={() => history.push("/login")}>Log in</Button>
          <ButtonText>or</ButtonText>
          <Button onClick={() => history.push("/signup")}>Sign up</Button>
        </ButtonGroup>
      </WrapperComponent>
    </MainComponent>
  );
}
