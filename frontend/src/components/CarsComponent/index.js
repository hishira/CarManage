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
  Spinner,
} from "../../shared/CSSComponents";
import { Message } from "../../shared/Message";
import { CarComponent } from "./CarComponent";
import { LogOutHandle } from "../../utils/auth.utils";
const CarsWrapper = styled(MainComponent)`
  width: 100%;
  position: relative;
  
`;

const Cars = styled.div`
  width: 100%;
  border: 2px solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UserInfo = styled.div`
  border: 2px solid green;
  width: 100%;
  @media (min-width: 700px){
    width: 50%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoutButton = styled(Button)`
  padding: 0.5rem;
`;
const UserCars = styled.div`
  display: flex;
  width: 100%;
  border: 2px solid green;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
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

  const loguthandle = () => {
    LogOutHandle();
    history.push("/");
  };
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
              <div>Full name {user.fullname}</div>
              <div>Email: {user.email}</div>
              <LogoutButton onClick={loguthandle}>Logout</LogoutButton>
            </UserInfo>
            <UserCars>
              {cars.map((car) => (
                <CarComponent
                  key={car._id}
                  car={car}
                  messagefunction={messageOpen}
                  reloadcars={reloadCar}
                />
              ))}
            </UserCars>
            <Button onClick={() => history.push("/newcar")}>Add new car</Button>
          </Cars>
        )}
      </CarsWrapper>
    </MainComponent>
  );
}
