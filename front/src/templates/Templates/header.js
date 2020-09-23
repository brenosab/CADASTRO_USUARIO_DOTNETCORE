import React from "react";
import {
  Navbar,
  Dropdown,
  Nav,
  NavItem,
} from "react-bootstrap";
import { FaBars } from "react-icons/fa";


const Header = (props) => {
  // const { usuario } = useSelector((state) => state);

  // const [api, setApi] = useState("Carregando");

  // useEffect(() => {
  //   Axios.get(getEnvParams(API_VERSION)).then((response) => {
  //     setApi(response.data);
  //   }).catch(() => { setApi("Error") })
  // }, []);

  return (
    <Navbar className="bg-primary">
      <Navbar.Brand>
        <a href="#/"><small style={{ color: "#fff", fontSize: 24 }}> Sistema Cadastro de Usuários</small></a>        
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <NavItem>
            <p className="mb-0">
              <span>Olá! Bem-Vindo ao GREat</span>
            </p>
          </NavItem>
        </Nav>

        <Dropdown alignRight>
          <Dropdown.Toggle>
            <FaBars />
          </Dropdown.Toggle>
          <Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;