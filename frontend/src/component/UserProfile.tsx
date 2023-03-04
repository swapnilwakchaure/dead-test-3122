import styled from "styled-components";

type Profile = {
    avatar: string,
    first_name: string,
    last_name: string,
    handleQuit: () => void
}

const UserProfile = ({ avatar, first_name, last_name, handleQuit }: Profile) => {
    return (
        <UserWrapper>
            <div>
                <Image src={avatar} alt={first_name} />
            </div>
            <div>
                <Name>{first_name} {last_name}</Name>
            </div>
            <button onClick={() => handleQuit()}>QUIT</button>
        </UserWrapper>
    )
}

export default UserProfile;


const UserWrapper = styled.div`
  border: 1px solid;
  border-radius: 5px;
  width: 70%;
  margin: auto;
  padding: 10px;
  line-height: 13px;
`

const Image = styled.img`
  border: 1px solid;
  width: 40%;
  border-radius: 50%; 
`

const Name = styled.p`
  font-weight: 600;
  font-size: 20px;
`