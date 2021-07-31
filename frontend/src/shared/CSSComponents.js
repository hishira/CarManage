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
  letter-spacing: 0.4rem;
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
export const InputComponent = styled.div`
  display: flex;
  width: 100%;
`;
export const Label = styled.label``;
export const Input = styled.input``;
export const Button = styled.button`
  padding: 1rem 1.5rem;
  border-radius: 10px;
  width: 10rem;
  border: 0.1rem solid slategray;
  font-size: 1.1rem;
  &:last-child {
    margin-top: 1rem;
  }
  &:hover {
    cursor: pointer;
    background-color: #fca311;
  }
`;
export const Spinner = styled.div`
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
