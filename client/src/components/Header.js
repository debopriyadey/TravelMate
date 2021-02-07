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
                <NavbarBrand href="/">Travllers Diary</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/Find">
                                <NavLink className="text-white NavStyle">
                                    Search
                                </NavLink>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/Upload">
                                <NavLink className="text-white NavStyle">
                                    Create Review
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