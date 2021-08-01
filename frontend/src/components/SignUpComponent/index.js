import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { InsertNewTokens } from "../../utils/cookies";
import { setUserActivity } from "../../utils/localstorage";
import {
  MainComponent,
  MainText,
  InputComponent,
  Label,
  Input,
  Button,
} from "../../shared/CSSComponents";
import { Message } from "../../shared/Message";
import { signupuserHandle } from "../../utils/auth.utils";
import { passwordValidate, emailvalidate } from "../../utils/datavalidation";
const WrappSigpUp = styled(MainComponent)`
  width: 100%;
  @media (min-width: 500px) {
    width: 70%;
  }
  @media (min-width: 900px) {
    width: 40%;
  }
`;
const SignUpForm = styled.form`
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

export default function SignUpComponent() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [messageopen, setmessageopen] = useState(false);
  const [messageoption, setmessageoption] = useState({
    color: "",
    message: "",
  });
  const history = useHistory();

  const sumbithandle = async (e) => {
    e.preventDefault();
    console.log(fullname, email, password);
    const emailpassobject = {
      fullname: fullname,
      email: email,
      password: password,
    };
    if (!passwordValidate(password, messageOpen)) return;
    if (!emailvalidate(email, messageOpen)) return;
    const signupinfo = await signupuserHandle(emailpassobject);
    if (signupinfo.status !== 200) {
      console.log(signupinfo.fetchinfo);
      messageOpen("warning", signupinfo.fetchinfo.message);
    } else {
      messageOpen("success", "Account create");
      setTimeout(() => {
        InsertNewTokens(signupinfo.fetchinfo);
        setUserActivity();
        history.push("/cars");
      }, 2000);
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
      <WrappSigpUp>
        <MainText>Sign Up</MainText>
        <SignUpForm onSubmit={sumbithandle}>
          <InputComponent>
            <Label>Full name</Label>
            <Input
              type="text"
              required
              placeholder="Full name"
              onChange={(e) => setfullname(e.target.value)}
            />
          </InputComponent>
          <InputComponent>
            <Label>Email</Label>
            <Input
              required
              type="email"
              placeholder="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </InputComponent>
          <InputComponent>
            <Label>Password</Label>
            <Input
              required
              type="password"
              placeholder="******"
              onChange={(e) => setpassword(e.target.value)}
            />
          </InputComponent>
          <SignUpText>
            Do you have account?{" "}
            <SignUpLink onClick={() => history.push("/login")}>
              Log in
            </SignUpLink>
          </SignUpText>
          <Button type="submit">Sign up</Button>
        </SignUpForm>
      </WrappSigpUp>
    </MainComponent>
  );
}
