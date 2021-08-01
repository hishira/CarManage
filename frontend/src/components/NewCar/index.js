import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Message } from "../../shared/Message";
import { CreateNewCarHandle } from "../../utils/car.util";
import {
  MainComponent,
  MainText,
  InputComponent,
  Label,
  Input,
  Button,
} from "../../shared/CSSComponents";
import { NewCarValidation } from "../../utils/datavalidation";
const NewCarWrapper = styled(MainComponent)`
  width: 100%;
  position: relative;
  @media (min-width: 500px) {
    width: 60%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
`;
const BackButton = styled(Button)`
  position: absolute;
  top: 0;
  border: none;
  background: transparent;
  z-index: 100;
  &:hover {
    background-color: lightslategray;
  }
  padding: 0.5rem;
  margin-bottom: 3rem;
`;
const NewCarForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export function NewCar() {
  const [newcar, setnewcar] = useState({
    producer: "",
    model: "",
    year: 1900,
    companyintrodate: Date.now(),
    actualrun: 0,
  });
  const [messageopen, setmessageopen] = useState(false);
  const [messageoption, setmessageoption] = useState({
    color: "",
    message: "",
  });
  const history = useHistory();
  const createNewCarHandle = async (e) => {
    e.preventDefault();
    console.log(newcar);
    if (!NewCarValidation(newcar, messageOpen)) return;
    const response = await CreateNewCarHandle(newcar);
    if (response === false) {
      history.push("/");
    }
    if (response.status === 200) {
      messageOpen("success", "New car added");
      setTimeout(() => history.push("/cars"), 2001);
    } else {
      messageOpen("warning", response.fetchobject.message);
    }
  };
  const messageOpen = (color, text) => {
    setmessageoption({ color: color, message: text });
    setmessageopen(true);
    setTimeout(() => {
      setmessageopen(false);
    }, 2000);
  };
  return (
    <MainComponent>
      <BackButton onClick={() => history.push("/cars")}>Back</BackButton>

      <Message
        visible={messageopen}
        color={messageoption.color}
        messagetext={messageoption.message}
      />
      <NewCarWrapper>
        <MainText>Add new car</MainText>
        <NewCarForm onSubmit={createNewCarHandle}>
          <InputComponent>
            <Label>Producer</Label>
            <Input
              type="text"
              required
              onChange={(e) =>
                setnewcar({ ...newcar, producer: e.target.value })
              }
            />
          </InputComponent>
          <InputComponent>
            <Label>Model</Label>
            <Input
              type="text"
              required
              onChange={(e) => setnewcar({ ...newcar, model: e.target.value })}
            />
          </InputComponent>
          <InputComponent>
            <Label>Year</Label>
            <Input
              type="number"
              min={1900}
              required
              max={new Date(Date.now()).getFullYear()}
              onChange={(e) => setnewcar({ ...newcar, year: e.target.value })}
            />
          </InputComponent>
          <InputComponent>
            <Label>Intro into company date</Label>
            <Input
              type="date"
              required
              onChange={(e) =>
                setnewcar({ ...newcar, companyintrodate: e.target.value })
              }
            />
          </InputComponent>
          <InputComponent>
            <Label>Actual run</Label>
            <Input
              type="number"
              min={0}
              required
              onChange={(e) =>
                setnewcar({ ...newcar, actualrun: e.target.value })
              }
            />
          </InputComponent>
          <Button type="submit">Add</Button>
        </NewCarForm>
      </NewCarWrapper>
    </MainComponent>
  );
}
