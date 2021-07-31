import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GetUserCars, DeleteCarHandle } from "../../utils/car.util";
import { GetUserInfoHandle } from "../../utils/user.util";
import { useHistory } from "react-router-dom";
import {
  MainComponent,
  MainText,
  InputComponent,
  Label,
  Input,
  Button,
} from "../../shared/CSSComponents";
import { Message } from "../../shared/Message";

const CarsWrapper = styled(MainComponent)`
  width: 100%;
  position: relative;
  @media (min-width: 500px) {
    width: 50%;
  }
`;
const Spinner = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  border: 1rem solid #14213d;
  border-radius: 50%;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: transparent;
  margin-top: 10rem;
  animation: rotate 1.2s ease-in-out infinite;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
const CarButtonGroup = styled.div`
  display: flex;
`;
const CarButton = styled.button``;
const Cars = styled.div``;
const UserInfo = styled.div``;
const Car = styled.div``;
const CarComponent = ({ car, messagefunction, reloadcars }) => {
  const deleteButtonHandle = async (carid) => {
    const response = await DeleteCarHandle(car._id);
    if (response.status === 200) {
      messagefunction("success", response.fetchobject.message);
      setTimeout(() => reloadcars(), 2000);
    } else {
      messagefunction("warning", response.fetchobject.message);
    }
  };
  return (
    <Car>
      <div>Producer {car.producer}</div>
      <div>Model {car.model} </div>
      <div>
        Intro date in company{" "}
        {new Date(car.companyintrodate).toLocaleDateString()}
      </div>
      <div>Actual run {car.actualrun} km</div>
      <CarButtonGroup>
        <CarButton>Edit</CarButton>
        <CarButton onClick={() => deleteButtonHandle()}>Delete</CarButton>
      </CarButtonGroup>
    </Car>
  );
};
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
