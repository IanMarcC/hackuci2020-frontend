import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import $ from 'jquery';
import Popper from 'popper.js';
import logo from './logo.svg';
import Post from './Posts.js';
import { Button, Modal, Navbar, Nav, NavDropdown, Form} from 'react-bootstrap';

const request = require('request');

class PostMaker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Sell a Swipe!</h1>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {user: '', password: '', showModal: false, logged_in: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handlePassInput = this.handlePassInput.bind(this);
    this.validLogin = this.validLogin.bind(this);
    //this.callback = this.callback.bind(this);
  }

  openModal() {
    if (!this.state.showModal){
      this.setState({showModal: true});
    }
  }

  closeModal() {
    if (this.state.showModal){
      this.setState({
        showModal: false,
        error: null});
    }
  }

  handleUserInput(event) {
    this.setState({user: event.target.value});
  }

  handlePassInput(event) {
    this.setState({password: event.target.value});
  }

  
  validLogin(event) {
    event.preventDefault();
    if (!this.state.logged_in) {
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:1337/api/idm/login";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
          if (xhr.status === 120) {
              var json = JSON.parse(xhr.responseText);
              console.log(json.email + ", " + json.password);
          }
        };
      var data = JSON.stringify({"email": this.state.user, "password": "passw0rD"});
      xhr.send(data);
      console.log("sent");
/*
      var form = {
        email: this.state.user,
        password: this.state.pass,
      };
      var url = 'http://localhost:1337/api/idm/login';
      console.log(this.state.user);
      console.log(this.state.pass);
      this.closeModal();
      request.post({url: url,body: form},this.callback);
    }
    */
  }
}

  callback(error, response, body) {
    //console.log(response.statusCode);
    if (!error && response.statusCode == 120) {
      const info = JSON.parse(body);
      console.log(info);
      this.setState( {user : info.email});
      console.log(this.state.user);
      return this.state.user;
    }
  }

  render() {
    if (!this.state.showModal)
    {
      return (
        <div> 
        <Poster logged_in={this.state.logged_in} />
        <div className="Login">
          <Button onClick={this.openModal} className="nav-button"> 
          {this.state.logged_in ? this.state.user : "Login"} 
          </Button>
        </div>
        </div>
      );  
    }
    else {
    return (
      <div className="nav-button">
        <Poster logged_in={this.state.logged_in} />
      <div className="Login">
          <Button onClick={this.openModal}> 
          {this.state.logged_in ? this.state.user : "Login"} 
          </Button>
        </div>
          <Modal show={this.state.showModal}>
            <Modal.Header closeButton="true" onClick={this.closeModal}>
            <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form action="">
                <Form.Group controlId="Username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="email" placeholder="Username" value={this.state.user} onChange={this.handleUserInput} />
                </Form.Group>

                <Form.Group controlId="Password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={this.state.pass} onChange={this.handlePassInput} />
                </Form.Group>
                <Button id="submit" onClick={this.validLogin}>
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
    );
    }
  }
}

class Poster extends Login {
  constructor(props) {
    super(props);
    this.logged_in = props.logged_in;
    this.state = {showModalP: false, price: '', availability: ''};
    this.openModalP = this.openModalP.bind(this);
    this.closeModalP = this.closeModalP.bind(this);
    this.handlePriceInput = this.handlePriceInput.bind(this);
    this.handleAvailInput = this.handleAvailInput.bind(this);
    this.submitPost = this.submitPost.bind(this);
    //this.callback = this.callback.bind(this);
  }

  makePost() {
    if (this.state.logged_in) {
      console.log("post made");
    }
  }

  openModalP() {
    if (!this.state.showModalP && this.props.logged_in){
      this.setState({
        showModalP: true
      });
      console.log("opened poster")
    }
    else {
      console.log(this.state.showModalP);
      console.log(this.state.logged_in);
      console.log("failed");
    }
  }

  closeModalP() {
    if (this.state.showModalP){
      this.setState({
        showModalP: false
      });
    }
  }

  handlePriceInput(event) {
    this.setState({price: event.target.value});
  }

  handleAvailInput(event) {
    this.setState({availability: event.target.value});
  }

  submitPost() {
    //Add http request and checking for valid input
    return true;
  }

  
  render() {
    if (!this.state.showModalP)
    {
      return (
        <div className="Poster">
          <Button onClick={this.openModalP} className="nav-button"> 
          Post a Swipe 
          </Button>
        </div>
      );  
    }
    else {
    return (
      <div>
      <div className="Poster">
          <Button onClick={this.openModalP} className="nav-button"> 
          Post a Swipe
          </Button>
        </div>
          <Modal show={this.state.showModalP}>
            <Modal.Header closeButton="true" onClick={this.closeModalP}>
            <Modal.Title>Post a Swipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="Price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control placeholder="Price" value={this.state.price} onChange={this.handlePriceInput} />
                </Form.Group>

                <Form.Group controlId="Your Availability">
                  <Form.Label>Your Availability</Form.Label>
                  <Form.Control placeholder="When/Where you can meet, etc." value={this.state.availability} onChange={this.handleAvailInput} />
                </Form.Group>
                <Button variant="primary" onChange={this.submitPost}>
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
    );
    }
  }
}

class Navibar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">AntEats</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Login />
    
  </Navbar.Collapse>
</Navbar>
    );
  }
}

class PostList extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Post user="kek" price="$3" availability="some time on Thursday" />
    );
  }
}
class App extends Component {
  state = {posts: [{user: "usermeme"}]};

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <div className="App">
        <Navibar />
        <PostList />
      </div>
    );
  }
}

export default App;
