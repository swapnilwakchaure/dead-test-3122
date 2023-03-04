import styled from "styled-components";
import Game from "../component/Game";
import UserProfile from "../component/UserProfile";

const Home = () => {

    let data1JSON = localStorage.getItem("user1") || "";
    let data1 = JSON.parse(data1JSON);

    let data2JSON = localStorage.getItem("user2") || "";
    let data2 = JSON.parse(data2JSON);

    const handleQuit = (data: any) => {
        localStorage.removeItem(data);
        window.location.reload();
    }

    return (
        <HomeWrapper>
            <PlayerWrapper>
                <h1>Player-Section</h1>
                {data1 ? <div></div> : <div>Please Select the Player1</div>}
                <div>
                    <Player>Player1</Player>
                    {data1 ?
                        <UserProfile
                            first_name={data1.first_name}
                            last_name={data1.last_name}
                            avatar={data1.avatar}
                            handleQuit={() => handleQuit("user1")}
                        />
                        :
                        <Error>Please Select the Player1</Error>}
                </div>
                <div>
                    <Player>Player2</Player>
                    {data2 ?
                        <UserProfile
                            first_name={data2.first_name}
                            last_name={data2.last_name}
                            avatar={data2.avatar}
                            handleQuit={() => handleQuit("user2")}
                        /> :
                        <Error>Please Select the Player2</Error>
                    }
                </div>
            </PlayerWrapper>
            <PlayerBoard>
                <h1>Playerboard</h1>
                <Game />
            </PlayerBoard>
            <ChatWrapper>
                <h1>Chat-Section</h1>
            </ChatWrapper>
        </HomeWrapper>
    )
}

export default Home;


const HomeWrapper = styled.div`
  border: 1px solid;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, max-content));
  gap: 2%;
`

const Player = styled.p`
  width: 20%;
  margin: 10px 20px;
`

const PlayerWrapper = styled.div`
  border: 1px solid;
  width: 90%;
  padding: 20px 0px;
  line-height: 20px;
`

const Error = styled.div`
  border: 1px dashed;
  width: 25%;
  margin: auto;
  padding: 50px;
  border-radius: 55%;
`


const PlayerBoard = styled.div`
  border: 1px solid blue;
`


const ChatWrapper = styled.div`
  border: 1px solid green;
`