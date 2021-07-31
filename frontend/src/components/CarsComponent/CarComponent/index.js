import React from "react";
import { DeleteCarHandle } from "../../../utils/car.util";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const CarButtonGroup = styled.div`
  display: flex;
`;
const CarButton = styled.button``;
const Car = styled.div``;

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
  const edithandle = ()=>{
     history.push(`/editcar/${car._id}`)
  }
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
        <CarButton onClick={edithandle}>Edit</CarButton>
        <CarButton onClick={() => deleteButtonHandle()}>Delete</CarButton>
      </CarButtonGroup>
    </Car>
  );
};
