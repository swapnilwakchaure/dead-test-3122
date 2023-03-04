import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Register = () => {

    const [avatar, setAvatar] = useState<string>("");
    const [first_name, setFirstName] = useState<string>("");
    const [last_name, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleRegister = (e: React.MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        const payload = { avatar, first_name, last_name, email, password };

        fetch('https://hungry-vestments-cod.cyclic.app/users/register', {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                alert(res.Message)
                navigate("/login")
            })
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <FormWrapper>
                {/* <AvatarWrapper>
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2aSUcU-KC_ZGl1KIFES1pwRe4YOMv2gPx_g&usqp=CAU" alt="avatar-image" />
                <input
                    type="file"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                />
            </AvatarWrapper> */}
                <DetailWrapper>
                    <Details>
                        <Label>Image:</Label>
                        <Label>First Name:</Label>
                        <Label>Last Name:</Label>
                        <Label>Email:</Label>
                        <Label>Password:</Label>
                    </Details>
                    <InputWrapper>
                        <Input
                            type="text"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            placeholder="Enter Image..."
                        />
                        <br />
                        <Input
                            type="text"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter First Name..."
                        />
                        <br />
                        <Input
                            type="text"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter Last Name..."
                        />
                        <br />
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
                <Link to="/login"><Button onClick={handleRegister}>SIGN IN</Button></Link>
            </FormWrapper>
        </div>
    )
}

export default Register;


const FormWrapper = styled.form`
  border: 1px solid;
  border-radius: 10px;
  width: 30%;
  margin: 50px auto;
  padding: 10px 10px 20px 10px;
`

const AvatarWrapper = styled.div`
`

const Image = styled.img`
  border: 1px solid;
  display: block;
  width: 30%;
  margin: 20px auto 10px auto;
  border-radius: 50%;
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