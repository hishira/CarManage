import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { Message } from "../../shared/Message";
import { GetCarHandle, UpdateCarHandle } from "../../utils/car.util";
import {
  MainComponent,
  MainText,
  InputComponent,
  Label,
  Input,
  Button,
  Spinner,
} from "../../shared/CSSComponents";
const EditCarWrapper = styled(MainComponent)`
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
const EditCarForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export function EditCar() {
  const { id } = useParams();
  const [updatecar, setupdatecar] = useState({
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
  const [loading, setloading] = useState("false");
  const fetchCarinfo = async () => {
    setloading("true");
    const response = await GetCarHandle(id);
    if (response.status === 200) {
      setupdatecar(response.fetchobject);
    }
    setloading("false");
  };
  useEffect(() => {
    fetchCarinfo();
  }, []);
  const history = useHistory();
  const createNewCarHandle = async (e) => {
    e.preventDefault();
    console.log(updatecar);
    const response = await UpdateCarHandle(id, updatecar);
    if (response === false) {
      history.push("/");
    }
    if (response.status === 200) {
      messageOpen("success", "Update car info");
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
      {loading === "true" ? (
        <Spinner />
      ) : (
        <EditCarWrapper>
          <MainText>Edit car</MainText>
          <EditCarForm onSubmit={createNewCarHandle}>
            <InputComponent>
              <Label>Producer</Label>
              <Input
                type="text"
                required
                value={updatecar.producer}
                onChange={(e) =>
                  setupdatecar({ ...updatecar, producer: e.target.value })
                }
              />
            </InputComponent>
            <InputComponent>
              <Label>Model</Label>
              <Input
                type="text"
                required
                value={updatecar.model}
                onChange={(e) =>
                  setupdatecar({ ...updatecar, model: e.target.value })
                }
              />
            </InputComponent>
            <InputComponent>
              <Label>Year</Label>
              <Input
                type="number"
                min={1900}
                required
                value={updatecar.year}
                max={new Date(Date.now()).getFullYear()}
                onChange={(e) =>
                  setupdatecar({ ...updatecar, year: e.target.value })
                }
              />
            </InputComponent>
            <InputComponent>
              <Label>Intro into company date</Label>
              <Input
                type="date"
                onChange={(e) =>
                  setupdatecar({
                    ...updatecar,
                    companyintrodate: e.target.value,
                  })
                }
              />
            </InputComponent>
            <InputComponent>
              <Label>Actual run</Label>
              <Input
                type="number"
                min={0}
                required
                value={updatecar.actualrun}
                onChange={(e) =>
                  setupdatecar({ ...updatecar, actualrun: e.target.value })
                }
              />
            </InputComponent>
            <Button type="submit">Update</Button>
          </EditCarForm>
        </EditCarWrapper>
      )}
    </MainComponent>
  );
}
