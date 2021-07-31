import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GetUserCars } from "../../utils/car.util";
import { useHistory } from "react-router-dom";
import {
  MainComponent,
  MainText,
  InputComponent,
  Label,
  Input,
} from "../../shared/CSSComponents";
const CarsWrapper = styled(MainComponent)`
  width: 100%;
  @media (min-width: 500px) {
    width: 50%;
  }
`;
export function CarsComponent() {
  const [cars, setCars] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const GetCars = async () => {
    const carresponse = await GetUserCars();
    if (carresponse === false) history.push("/");
    console.log(carresponse);
    if (carresponse.status === 200) setCars(carresponse.fetchobject);
  };
  useEffect(() => {
    GetCars();
  }, []);
  return (
    <MainComponent>
      <CarsWrapper>
        <MainText>Yours cars</MainText>
      </CarsWrapper>
    </MainComponent>
  );
}
