import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import '../css/header.css';
import { Link } from 'react-router-dom';


const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Fight depression</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {/* <NavItem>
                            <Link to="/successstories">
                                <NavLink className="text-white NavStyle">
                                    Success Stories
                                </NavLink>
                            </Link>
                        </NavItem> */}
                        <NavItem>
                            <Link to="/Find">
                                <NavLink className="text-white NavStyle">
                                    Find
                                </NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/Upload">
                                <NavLink className="text-white NavStyle">
                                    Upload
                                </NavLink>
                            </Link>
                        </NavItem>
                        
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header;