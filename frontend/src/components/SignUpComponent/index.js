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
} from "../../shared/CSSComponents";
import { signupuserHandle } from "../../utils/auth.utils";
const WrappSigpUp = styled(MainComponent)`
  width: 100%;
  @media (min-width: 500px) {
    width: 50%;
  }
`;
const SignUpForm = styled.form`
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
export default function SignUpComponent() {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();
  const sumbithandle = async (e) => {
    e.preventDefault();
    console.log(fullname, email, password);
    const emailpassobject = {
      fullname: fullname,
      email: email,
      password: password,
    };
    const signupinfo = await signupuserHandle(emailpassobject);
    if (signupinfo.status !== 200) {
      console.log(signupinfo.fetchinfo);
    } else {
      InsertNewTokens(signupinfo.fetchinfo);
      setUserActivity();
      history.push("/cars");
    }
  };
  return (
    <MainComponent>
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
