import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import {
  MainComponent,
  MainText,
  InputComponent,
  Label,
  Input,
  Button,
} from "../../shared/CSSComponents";
import { loginuserHandle } from "../../utils/auth.utils";
import { InsertNewTokens } from "../../utils/cookies";
import { setUserActivity } from "../../utils/localstorage";
import {Message} from "../../shared/Message"
const WrappLogin = styled(MainComponent)`
  width: 100%;
  @media (min-width: 500px) {
    width: 50%;
  }
`;
const LoginForm = styled.form`
  width: 100%;
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

const LoginButton = styled(Button)`
  padding-top: .5rem;
  padding-bottom: .5rem;
`
export default function LoginComponent() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();
  const [messageopen, setmessageopen] = useState(false);
  const [messageoption, setmessageoption] = useState({
    color: "",
    message: "",
  });
  
  const sumbithandle = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const emailpassobject = {
      email: email,
      password: password,
    };
    const loginresponse = await loginuserHandle(emailpassobject);
    if (loginresponse.status !== 200) {
      messageOpen("warning", loginresponse.fetchinfo.message);

    } else {
      InsertNewTokens(loginresponse.fetchinfo);
      setUserActivity();
      history.push("/cars");
    }
  };
  
  const messageOpen = (color, text) => {
    setmessageoption({ color: color, message: text });
    setmessageopen(true);
    setTimeout(() => {
      setmessageopen(false);
    }, 2000);
  };
  
  return (
    <MainComponent>
      <Message
        visible={messageopen}
        color={messageoption.color}
        messagetext={messageoption.message}
      />
      <WrappLogin>
        <MainText>Login</MainText>
        <LoginForm onSubmit={sumbithandle}>
          <InputComponent>
            <Label>Email</Label>
            <Input placeholder="example@example.com" type="email" onChange={(e) => setemail(e.target.value)} />
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
          <LoginButton type="submit">Login</LoginButton>
        </LoginForm>
      </WrappLogin>
    </MainComponent>
  );
}
