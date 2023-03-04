import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface PersistentStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: any): void;
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  let data = JSON.parse(localStorage.getItem("user1") || "{}");
  console.log(data);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const payload = { email, password };

    fetch("http://localhost:8080/users/login", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.user);
        alert(res.Message);

        if (localStorage.getItem("user1") !== null) {
          localStorage.setItem("user2", JSON.stringify(res.user[0]));
        } else {
          localStorage.setItem("user1", JSON.stringify(res.user[0]));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <FormWrapper>
        <DetailWrapper>
          <Details>
            <Label>Email:</Label>
            <Label>Password:</Label>
          </Details>
          <InputWrapper>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email..."
            />
            <br />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password..."
            />
          </InputWrapper>
        </DetailWrapper>
        <Link to="/">
          <Button onClick={handleLogin}>LOGIN</Button>
        </Link>
      </FormWrapper>
    </div>
  );
};

export default Login;




const FormWrapper = styled.form`
border: 1px solid;
border-radius: 10px;
width: 30%;
margin: 50px auto;
padding: 10px 10px 20px 10px;
`

const DetailWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 2%;
line-height: 40px;
`

const Details = styled.div`
text-align: start;
`

const Label = styled.p`
font-weight: 500;
`

const InputWrapper = styled.div`
`

const Input = styled.input`
border: 1px solid;
border-radius: 5px;
width: 95%;
padding: 10px 20px 10px 5px;
margin: 10px 0px;
`

const Button = styled.button`
padding: 10px 20px;
font-weight: 550;
border: none;
border-radius: 5px;
background-color: grey;
color: white;

&: hover {
background-color: black;
color: white;
}
`


    // if (JSON.parse(localStorage.getItem("user1") || "")) {
    //     localStorage.setItem("user2", JSON.stringify(res.user[0]));
    // } else {
    //     localStorage.setItem("user1", JSON.stringify(res.user[0]));
    // }
