import React from "react";
import { DeleteCarHandle } from "../../../utils/car.util";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const CarButtonGroup = styled.div`
  display: flex;
  width: 100%;
`;
const CarInfoWrapper = styled.div`
  padding: 0.4rem;
`;
const CarButton = styled.button`
  padding: 0.6rem;
  width: calc(50% );
  border: 0.02rem solid lightslategray;
  cursor: pointer;
`;
const EditButton = styled(CarButton)`
  color: blue;
  border-bottom-left-radius: 5px;
  border: 0.02rem solid blue;
  &:hover {
    background-color: hsl(240, 100%, 90%);
  }
`;
const DeleteButton = styled(CarButton)`
  color: #ff3333;
  border-bottom-right-radius: 5px;
  border: 0.02rem solid #ff3333;
  &:hover {
    background-color: hsl(0, 100%, 90%);
  }
`;
const Car = styled.div`
  width: 100%;
  border-radius: 5px;
  box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem lightslategray;
  @media (min-width: 600px) {
    width: auto;
  }
  @media (min-width: 1200px) {
    width: 25%;
  }
`;
const CarInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
`;
const FirstInfo = styled.div``;
const SecondInfo = styled.div``;
export const CarComponent = ({ car, messagefunction, reloadcars }) => {
  const history = useHistory();
  const deleteButtonHandle = async (carid) => {
    const response = await DeleteCarHandle(car._id);
    if (response.status === 200) {
      messagefunction("success", response.fetchobject.message);
      setTimeout(() => reloadcars(), 2000);
    } else {
      messagefunction("warning", response.fetchobject.message);
    }
  };
  const edithandle = () => {
    history.push(`/editcar/${car._id}`);
  };
  return (
    <Car>
      <CarInfoWrapper>
        <CarInfo>
          <FirstInfo>Producer</FirstInfo>{" "}
          <SecondInfo>{car.producer} </SecondInfo>
        </CarInfo>
        <CarInfo>
          <FirstInfo>Model</FirstInfo> <SecondInfo>{car.model} </SecondInfo>
        </CarInfo>
        <CarInfo>
          <FirstInfo>Year</FirstInfo> <SecondInfo>{car.year} </SecondInfo>
        </CarInfo>
        <CarInfo>
          <FirstInfo>Intro date in company</FirstInfo>
          <SecondInfo>
            {new Date(car.companyintrodate).toLocaleDateString()}
          </SecondInfo>
        </CarInfo>
        <CarInfo>
          <FirstInfo>Actual run</FirstInfo>{" "}
          <SecondInfo>{car.actualrun} km</SecondInfo>
        </CarInfo>
      </CarInfoWrapper>
      <CarButtonGroup>
        <EditButton onClick={edithandle}>Edit</EditButton>
        <DeleteButton onClick={() => deleteButtonHandle()}>Delete</DeleteButton>
      </CarButtonGroup>
    </Car>
  );
};
