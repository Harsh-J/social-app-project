import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, ModalFooter, Alert, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {Link} from 'react-router-dom';




class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            nestedModal: false,
            dropdownOpen: false,
            closeAll:false,
            isSearchModalOpen:false,
            searchtext:'',

        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.toggledropdown = this.toggledropdown.bind(this);
        this.toggleSearchModal=this.toggleSearchModal.bind(this);
       

        this.toggleNested=this.toggleNested.bind(this);
        this.handleSignUp=this.handleSignUp.bind(this);

    }
    
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    toggleSearchModal() {
        this.setState({
            isSearchModalOpen: !this.state.isSearchModalOpen
        });
    }
    toggledropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    }

    toggleNested = () => {
        this.setState({
            nestedModal:!this.state.nestedModal,
            closeAll:false
        })
     
      }
    toggleAll = () => {
        this.setState({
            nestedModal:!this.state.nestedModal,
            closeAll:true
        })
       
      }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value });
        event.preventDefault();

    }
    handleSignUp(event){

       

        this.props.registerUser({username:this.username.value,firstname:this.firstname.value,lastname:this.lastname.value,password:this.password.value});
 
        event.preventDefault();


    }
    handleLogout() {
        this.props.logoutUser();
    }
    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" sticky="top" className=" headNav">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto brand">
                           <Link to="/" className="mainlink"> <p>Get Social</p></Link>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="mr-auto">
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        Home
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        About Us
                                </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/favorites">
                                        My Favorites
                                </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        Contact Us
                                </NavLink>
                                </NavItem>
                            </Nav>

                        </Collapse>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {!this.props.auth.isAuthenticated ?
                                    <Button outline color="warning" onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span> Login
                                            {this.props.auth.isLoading ?
                                            <span><Spinner className="ml-1" size="sm" color="warning" /></span>
                                            : null
                                        }
                                    </Button>
                                    :
                                    <div>
                                        
                                        <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggledropdown}>
                                            <DropdownToggle caret  outline color="warning" className="dropbtn">
                                            <div className="navbar-text ">{this.props.auth.user.username}</div>
                                          </DropdownToggle>
                                            <DropdownMenu>
                                                
                                                <NavItem><NavLink className="navlink" to="/profile"><DropdownItem><span className="fa fa-user mr-2"></span>Profile</DropdownItem></NavLink></NavItem>
                                                <DropdownItem divider />
                                                <NavItem><NavLink className="navlink" to="/createPost"><DropdownItem ><span className="fa fa-pencil mr-2"></span>Create a Post</DropdownItem></NavLink></NavItem>
                                                <DropdownItem divider />
                                                <NavItem><NavLink className="navlink" to="/followingPosts"><DropdownItem><span className="fa fa-rss mr-2 "></span>My Following Posts</DropdownItem></NavLink></NavItem>
                                                <DropdownItem divider />
                                                
                                               
                                                <DropdownItem onClick={this.handleLogout}><span className="fa fa-sign-out "></span> Logout</DropdownItem>
                                            </DropdownMenu>

                                            
                                            
                                                
                                            {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                       
                                        </ButtonDropdown>
                                    </div>

                                }

                            </NavItem>

                        </Nav>
                    </div>
                </Navbar>
                <Jumbotron className="headApp">
                    <div className="container headAppcont">
                        <div className="row row-header headApprow">
                            <div className="col-12 col-sm-6 headAppDiv">
                                <h1>Get Social</h1>
                                <p><i>Meet your friends and make a ton of good memories and share them too!</i></p>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </Jumbotron>
                <Modal isOpen={this.state.isSearchModalOpen} toggle={this.toggleSearchModal}>
            <ModalHeader toggle={this.toggleSearchModal} >Search a user</ModalHeader>
            <ModalBody>      
                      
               <Input type="text" placeholder="search a user by username or full name" value={this.state.searchtext} onChange={(e)=>this.props.fetchSearchUsers(e.target.value)} />  
                    
                
            </ModalBody>
            
           </Modal>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal} >Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                Remember me
                            </Label>
                            </FormGroup>
                            <div className="login-btn">
                                <Button type="submit" className="mb-2 login-btn-btn" value="submit" color="primary">Login</Button>
                            </div>
                        </Form>



                        <hr></hr>
                        
                        <div className="signup-btn">
                        <p>Do not have a account yet?</p>
                            <Button color="success" className="mt-0 signup-btn-btn" onClick={this.toggleNested}>Register</Button>
                        </div>
                        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggleModal : undefined}>
                            <ModalHeader>Register</ModalHeader>
                            <ModalBody>
                            <Form onSubmit={this.handleSignUp}>
                            <FormGroup >
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="firstname">FirstName</Label>
                                <Input type="text" id="firstname" name="firstname"
                                    innerRef={(input) => this.firstname = input} />
                                    
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">LastName</Label>
                                <Input type="text" id="lastname" name="lastname"
                                    innerRef={(input) => this.lastname = input} />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input} />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <div className="signup-btn">
                            <Button type="submit" className="mt-1 signup-btn-btn" value="submit" color="primary">Register{this.props.auth.RegisterLoading ? <Spinner size="sm" color="light" className="ml-1"></Spinner>:<span></span>}</Button>
                            </div>
                                
                        </Form>
                        {this.props.auth.RegisterSuccess ?
                                     <Alert color="success" className="mt-2">
                                     Registered Successfully!!
                                   </Alert>
                                   :
                                   <div>

                                   </div>
                                    
                                }
                        
                            </ModalBody>
                            <ModalFooter>
                               
                                <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
                            </ModalFooter>
                        </Modal>
                    </ModalBody>

                

                    
                </Modal>

            </React.Fragment>

        )
    }
}

export default Header;