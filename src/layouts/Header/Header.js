import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.scss";
import { NavLink, useLocation } from "react-router-dom";
import { faGear, faRightFromBracket, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  let location = useLocation(); // dùng activeKey={location.pathname} để tạo class active,
  console.log(location);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faTiktok} /> Phuc Dev
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav className="me-auto" activeKey={location.pathname}> */}
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <NavLink to="/users" className="nav-link">
              Manage Users
            </NavLink>
          </Nav>
          <Nav className="align-items-center">
          <FontAwesomeIcon className="icon-setting" icon={faGear} />
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item href="/login">
              <FontAwesomeIcon className="me-1 icon-login" icon={faRightToBracket} />
                Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/loguot">
              <FontAwesomeIcon className="me-1 icon-logout" icon={faRightFromBracket} />
                Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
