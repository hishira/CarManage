import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GetUserCars } from "../../utils/car.util";
import { GetUserInfoHandle } from "../../utils/user.util";
import { useHistory } from "react-router-dom";
import {
  MainComponent,
  MainText,
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const UserInfo = styled.div`
  width: 100%;
  @media (min-width: 700px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: 30%;
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
  margin-top: .4rem;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;
const UserName = styled.div`
  display: flex;
  width: 100%;
  @media (min-width: 500px) {
    width: 80%;
  }
  justify-content: space-around;
  & > * {
    width: 50%;
    &:last-child {
      text-align: end;
    }
  }
`;
const UserEmail = styled(UserName)``;
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
    if (carresponse === false || userresponse === false){
      history.push("/");
      return;
    }
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
  }, [reloadcars]);// eslint-disable-line react-hooks/exhaustive-deps

  const loguthandle = () => {
    LogOutHandle();
    history.push("/");
  };
  return (
    <MainComponent>
      <CarsWrapper>
          <Message
            color={messageoption.color}
            visible={messageopen}
            messagetext={messageoption.message}
          />
        <MainText>Your cars</MainText>
        {isLoading ? (
          <Spinner />
        ) : (
          <Cars>
            <UserInfo>
              <UserName>
                <div>Full name</div> <div>{user.fullname}</div>
              </UserName>
              <UserEmail>
                <div>Email:</div> <div>{user.email}</div>
              </UserEmail>
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
