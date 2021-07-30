import styled from "styled-components";
export const MainComponent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-items: center;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  border: 2px solid red;
`;
export const MainText = styled.p`
  font-size: 2.7rem;
  @media (min-width: 500px) {
    font-size: 1.7rem;
    padding: 0rem 3rem;
    word-wrap: break-word;
  }
  @media (min-width: 800px) {
    font-size: 2.5rem;
  }
  @media (min-width: 1000px) {
    font-size: 3.3rem;
  }
  color: #14213d;
  border: 2px solid red;
  width: 100%;
  text-align: center;
`;
