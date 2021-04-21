import React, {Component} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import {Container, Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import API from '../libs/axios';
import {logout, isLogin, isAdmin} from '../libs/utils';
import {ImagesUrl} from '../libs/urls';
import SearchForm from './searchForm';
import {FaBars, FaSignInAlt, FaSignOutAlt, FaKey} from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';

class NavbarA extends Component{
  constructor(props) {
    super(props)
    this.state = {
        login:false,
        id: '',
        name: '',
        foto:'',
        user: false,
        admin: false,
        url: ImagesUrl(),
        loading: true
    }
  }

Logout = () => {
    logout();
}

componentDidMount = () => {
  if (!isAdmin()) {
    return( Router.push('/login') )
  }
 if (isAdmin()) {
       const data = JSON.parse(localStorage.getItem('isAdmin'))
       const id = data[0].email
       console.log(id)
       API.GetUserId(id).then(res=>{

           this.setState({
            id: res.data.id,
               name: res.data.name,
               email: res.data.email,
               loading: false,
               admin: true
           })
       })
           
   }
  else {
    setTimeout(() => this.setState({
          login: true,
          loading: false
      }), 100);
  }
  
  }

  render(){

    return(
     
<Navbar bg="primary" variant="dark" className="shadow border-bottom py-0" expand="lg" sticky="top">
<Container>
{this.state.admin && (
    <Button onClick={this.props.toggleMenu} type="button" className="btn btn-primary text-white me-2">
      <FaBars />
    </Button>
  )}
  <Link href="/" passHref><Navbar.Brand>{ this.state.loading ?<><Skeleton width={180} height={25} /></>:<>{this.props.setting.company}</>}</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" className="sub-menu-bar" />
  <Navbar.Collapse id="basic-navbar-nav">
  <ul className="navbar-nav me-auto">
  <li className="nav-item"><Link href="/" passHref><Nav.Link>Home</Nav.Link></Link></li>
      {/*<Link href="/blog" passHref><Nav.Link>Blog</Nav.Link></Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <Link href="#" passHref><NavDropdown.Item>Action</NavDropdown.Item></Link>
        <Link href="#" passHref><NavDropdown.Item>Another action</NavDropdown.Item></Link>
        <Link href="#" passHref><NavDropdown.Item>Something</NavDropdown.Item></Link>
        <NavDropdown.Divider />
        <Link href="#" passHref><NavDropdown.Item>Separated link</NavDropdown.Item></Link>
      </NavDropdown>*/}
    </ul>

    <SearchForm/>

    {this.state.login ?
    <>
    <Form inline>
    <Link href="/login" passHref><Button className="text-light" variant="link"><FaSignInAlt/> Login</Button></Link>
    </Form>
    
    </>
    :
    <>
    <ul id="nav" className="navbar-nav ms-auto">
    
    <NavDropdown title=
    {this.state.foto ? (
    <>
    <img
        alt="Foto"
        width="30"
        className="rounded-circle"
        src={this.state.url+this.state.foto} />
    </>
        ) : (
    <>
    <img
        alt="Foto"
        width="30"
        className="rounded-circle"
        src={this.state.url+'no-avatar.png'} />
    </>
    )} id="basic-nav-dropdown" alignRight>
    <NavDropdown.Item>{this.state.email}</NavDropdown.Item>
    <NavDropdown.Item><Link href="/admin/password" passHref><a><FaKey/> Ganti Password</a></Link></NavDropdown.Item>
    <NavDropdown.Item onClick={this.Logout} href=''><FaSignOutAlt/> Logout</NavDropdown.Item>
    </NavDropdown>
    </ul>
    </>
    }
    
  </Navbar.Collapse>
  </Container>
</Navbar>
     
    );
  }
}

export default NavbarA;