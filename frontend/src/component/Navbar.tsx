import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {

    let data1JSON = localStorage.getItem("user1") || "";
    let data1 = JSON.parse(data1JSON);

    let data2JSON = localStorage.getItem("user2") || "";
    let data2 = JSON.parse(data2JSON);

    return (
        <NavbarWrapper>
            <Link to="/" >Home</Link>
            <Link to="/register">
                {data1 && data2 ?
                    <button disabled>SIGN IN</button> :
                    <button>SIGN IN</button>
                }
            </Link>
        </NavbarWrapper>
    )
}

export default Navbar;


const NavbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2%;
  padding: 10px;
  font-weight: 600;
  font-size: 20px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

// position: sticky;
// top: 0;