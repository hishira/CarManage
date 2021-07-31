import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import {
  MainComponent,
  MainText,
  InputComponent,
  Label,
  Input,
} from "../../shared/CSSComponents";
import { loginuserHandle } from "../../utils/auth.utils";
import { InsertNewTokens } from "../../utils/cookies";
import { setUserActivity } from "../../utils/localstorage";
const WrappLogin = styled(MainComponent)`
  width: 100%;
  @media (min-width: 500px) {
    width: 50%;
  }
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpText = styled.span`
  margin: 0.5rem 0rem;
`;
const SignUpLink = styled.span`
  color: blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button``;
export default function LoginComponent() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();
  const sumbithandle = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const emailpassobject = {
      email: email,
      password: password,
    };
    const loginresponse = await loginuserHandle(emailpassobject);
    if (loginresponse.status !== 200) {
      console.log(loginresponse.fetchinfo);
    } else {
      InsertNewTokens(loginresponse.fetchinfo);
      setUserActivity();
      history.push("/cars");
    }
  };
  return (
    <MainComponent>
      <WrappLogin>
        <MainText>Login</MainText>
        <LoginForm onSubmit={sumbithandle}>
          <InputComponent>
            <Label>Email</Label>
            <Input type="email" onChange={(e) => setemail(e.target.value)} />
          </InputComponent>
          <InputComponent>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="******"
              onChange={(e) => setpassword(e.target.value)}
            />
          </InputComponent>
          <SignUpText>
            Do not have account?{" "}
            <SignUpLink onClick={() => history.push("/signup")}>
              Sign up
            </SignUpLink>
          </SignUpText>
          <Button type="submit">Login</Button>
        </LoginForm>
      </WrappLogin>
    </MainComponent>
  );
}
