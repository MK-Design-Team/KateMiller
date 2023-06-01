import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useLocation, useNavigate, NavLink, Link } from 'react-router-dom'
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import './Header.css'

export default function Header() {

    const [pageState, setPageState] = useState("Sign In")



    const location = useLocation()
    const navigate = useNavigate()
    const auth = getAuth()
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPageState("Profile")
            } else {
                setPageState("Sign In")
            }
        })
    }, [auth])
    function pathMatchRoute(route) {
        if (route === location.pathname) {
            return true
        }
    }
    const StyledLink = styled(Link)`
        color: Blue;
        text-decoration: none;
        margin: 1rem;
        position: relative;
      `;



    return (
        <>
            <header >
                <Navbar collapseOnSelect expand="lg" bg="light" variant="red
        ">
                    <Container>
                        <Navbar.Brand >

                            <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="realtor"
                                className='h-5 cursor-pointer '
                                onClick={() => navigate("/")} />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link className={` cursor-pointer   ${pathMatchRoute("/") && "{StyledLink} "}`}
                                    onClick={() => navigate("/")}>Home</Nav.Link>


                                <Nav.Link className={`cursor-pointer 
                        border-b-transparent ${pathMatchRoute("/offers") && ""}`}
                                    onClick={() => navigate("/offers")}>Offers</Nav.Link>

                                <Nav.Link className={`cursor-pointer  ${pathMatchRoute("/katestoys") && ""}`}
                                    onClick={() => navigate("/katestoys")}>Kates Toys</Nav.Link>



                            </Nav>
                            <Nav>
                                <Nav.Link className={`cursor-pointer ${(pathMatchRoute("/profile") || pathMatchRoute("/sign-in")) &&
                                    "fucker"}`}
                                    onClick={() => navigate("/profile")}
                                >
                                    {pageState}
                                </Nav.Link>






                                {/* <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
}
