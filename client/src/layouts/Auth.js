import React from 'react'
import { MoreVert } from '@material-ui/icons';
import { Checkbox, Card, CardContent, TextField , Slide, Grid, Typography, withStyles, CardHeader, Button, Divider, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { card, boxShadow, roseColor, grayColor, defaultFont } from "assets/jss/cl-components.js";

import authStyle from 'assets/jss/cl-components/authStyle';

const LogInTransition = (props) => {
  return <Slide direction="right" {...props} />;
}
const SignUpTransition = (props) => {
  return <Slide direction="left" {...props} />;
}

class Auth extends React.Component {

    state = {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              phoneNumber: "",
              uid: "",
              confirmPassword: "",
              loginEmail: "",
              loginPassword: "",
              logIn: true
              };

    // Handlers

    handleClose = () => {
      this.setState({ logIn : !this.state.logIn });
    }

    handleSubmit = (event) => {
      console.log(this.state.password == this.state.confirmPassword)
      if(this.state.password == this.state.confirmPassword) {
        const { firstName, lastName, email, password, phoneNumber} = this.state;
        const newUser = { firstName, lastName, email, password, phone : phoneNumber}
    
        this.props.signUp(newUser)
      }
    };

    handleLogin = (event) => {
      this.props.logIn({email : this.state.loginEmail, password : this.state.loginPassword})
    }

    handleFirstNameChange = (event) => {
        this.setState({
          firstName: event.target.value
        });
    };

    handleLastNameChange = (event) => {
        this.setState({
          lastName: event.target.value
        });
    };

    handlePhoneNumberChange = (event) => {
        this.setState({
          phoneNumber: event.target.value
        });
    };

    handleEmailChange = (event) => {
        this.setState({
          email: event.target.value
        });
    };

    handleLoginEmailChange = (event) => {
        this.setState({
          loginEmail: event.target.value
        });
    };

    handleLoginPasswordChange = (event) => {
        this.setState({
          loginPassword: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        this.setState({
          password: event.target.value
        });
    };

    handleConfirmPasswordChange = (event) => {
        this.setState({
          confirmPassword: event.target.value
        });
    };

    render() {
        const { classes, ...rest } = this.props;

        return (
            <div style={{width:'100vw', height:'100vh', top:'0', left:'0'}}>

                  <Dialog open={this.state.logIn} TransitionComponent={LogInTransition} onClose={this.handleClose} >
                  <DialogTitle><Typography variant='display1'> Log In </Typography></DialogTitle>
                    <DialogContent>
                      <TextField 
                      value={this.state.loginEmail}
                      onChange={this.handleLoginEmailChange}
                      label="Email"
                      placeholder="Email"
                      />
                      <br></br>
                      <TextField 
                        value={this.state.loginPassword}
                        onChange={this.handleLoginPasswordChange}
                        label="Password"
                        type="password"
                        placeholder="Password"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        className={classes.roseIcon}
                        onClick={this.handleClose}>
                        Sign Up
                      </Button>
                      <Button
                        className={classes.whiteIcon}
                        onClick={this.handleLogin}>
                        Log In
                      </Button>
                    </DialogActions>
                    </Dialog>

                  <Dialog open={!this.state.logIn} TransitionComponent={SignUpTransition}  onClose={this.handleClose}>
                    <DialogTitle><Typography variant='display1'> Sign Up </Typography></DialogTitle>
                    <DialogContent>
                      <TextField 
                        value={this.state.firstName}
                        className = {classes.textBox}
                        onChange={this.handleFirstNameChange}
                        label="First Name"
                        placeholder="First Name"
                      />
                      <br></br>
                      <TextField 
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange}
                        label="Last Name"
                        placeholder="Last Name"
                      />
                      <br></br>
                      <TextField 
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        label="Email"
                        placeholder="Email"
                      />
                      <br></br>
                      <TextField 
                        value={this.state.phoneNumber}
                        onChange={this.handlePhoneNumberChange}
                        label="Phone Number"
                        placeholder="Phone Number"
                      />
                      <br></br>
                      <TextField 
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        type="password"
                        label="Password"
                        placeholder="Password"
                      />
                      <br></br>
                      <TextField 
                        value={this.state.confirmPassword}
                        onChange={this.handleConfirmPasswordChange}
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                      />

                    </DialogContent>
                    <DialogActions>
                      <Button
                        className={classes.roseIcon}
                        onClick={this.handleClose}>
                        Log In
                      </Button>
                      <Button
                        className={classes.whiteIcon}
                        onClick={this.handleSubmit}>
                        Sign Up
                      </Button>
                    </DialogActions>
                  </Dialog>
            </div>
        );
    }
}

export default withStyles(authStyle)(Auth);