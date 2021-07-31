import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GetUserCars } from "../../utils/car.util";
import { GetUserInfoHandle } from "../../utils/user.util";
import { useHistory } from "react-router-dom";
import {
  MainComponent,
  MainText,
  InputComponent,
  Label,
  Input,
  Button,
  Spinner
} from "../../shared/CSSComponents";
import { Message } from "../../shared/Message";
import { CarComponent } from "./CarComponent";
const CarsWrapper = styled(MainComponent)`
  width: 100%;
  position: relative;
  @media (min-width: 500px) {
    width: 50%;
  }
`;


const Cars = styled.div``;
const UserInfo = styled.div``;

export function CarsComponent() {
  const [user, setuser] = useState({});
  const [cars, setCars] = useState([]);
  const [messageopen, setmessageopen] = useState(false);
  const [messageoption, setmessageoption] = useState({
    color: "",
    message: "",
  });
  const [reloadcars, setcarsrealod] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const GetCars = async () => {
    setLoading(true);
    const userresponse = await GetUserInfoHandle();
    const carresponse = await GetUserCars();
    if (carresponse === false || userresponse === false) history.push("/");
    console.log(carresponse);
    if (carresponse.status === 200 && userresponse.status === 200) {
      setCars(carresponse.fetchobject);
      setuser(userresponse.fetchobject);
    }
    setLoading(false);
  };

  const reloadCar = () => setcarsrealod(!reloadcars);
  const messageOpen = (color, text) => {
    setmessageoption({ color: color, message: text });
    setmessageopen(true);
    setTimeout(() => {
      setmessageopen(false);
    }, 2000);
  };
  useEffect(() => {
    GetCars();
  }, [reloadcars]);
  return (
    <MainComponent>
      <CarsWrapper>
        {messageopen ? (
          <Message
            color={messageoption.color}
            messagetext={messageoption.message}
          />
        ) : null}
        <MainText>Yours cars</MainText>
        {isLoading ? (
          <Spinner />
        ) : (
          <Cars>
            <UserInfo>
              <div>{user.fullname}</div>
              <div>{user.email}</div>
            </UserInfo>
            {cars.map((car) => (
              <CarComponent
                key={car._id}
                car={car}
                messagefunction={messageOpen}
                reloadcars={reloadCar}
              />
            ))}
            <Button onClick={() => history.push("/newcar")}>Add new car</Button>
          </Cars>
        )}
      </CarsWrapper>
    </MainComponent>
  );
}
