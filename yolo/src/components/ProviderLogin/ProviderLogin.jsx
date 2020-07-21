import React from 'react';
import HeaderContainer from '../../containers/headerContainer';
import './ProviderLogin.css';
import {
    Grid, Container,
    Card, TextField,
    CardHeader, CardContent, CardActions,
    Snackbar, Button, Link
} from '@material-ui/core';
import { history, store } from '../../store';
import log from '../../utils/logger.service';

export default class ProviderLogin extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            open: false,
            errors: {
                email: '',
                password: ''
            }
        }
    }

    componentDidMount() {
        document.title = 'Yolo - Provider Login';
        log('User is on Provider Login')

    }
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open: false});
    };
    
    navigateToDashboard = () => {
        history.push('/provider/dashboard');
    }

    change = (e) => {
        const { name, value } = e.target;
        let errors = this.state.errors;
        switch(name) {
            case 'email':
                errors.email = value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? '' : 'Invalid Email Address';
                break;
            case 'password':
                errors.password = value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? '' : 'Password should be atleast 7 characters with alphanumeric characters';
                break;
            default:
                break;
        }
        this.setState({errors, [name]: value}, ()=> {
            return null;
        });
    }

    login = (e) => {
        e.preventDefault();
        this.props.providerLogin(this.state.email, this.state.password);
        store.subscribe(()=> {
            if(store.getState().providerLogin.error) {
                this.setState({
                    open: true
                })
                this.setState({
                    errorMessage: store.getState().providerLogin.error
                })
            } else {
                window.localStorage.setItem('token', store.getState().providerLogin.success.token);
                window.localStorage.setItem('providerProfile', true);
                history.push('/');
            }
        })
    }

    render() {
        return(
            <div>
                <HeaderContainer />
                <Grid container
                    className="rootLoginHead"
                    alignItems="center"
                    justify="center"
                    alignContent="center"
                >
                    <Grid item
                        xs={10} 
                        alignContent="center" 
                        container
                        justify="center" 
                        alignItems="center"
                    >
                        <Container fixed>
                            <Card>
                                <CardHeader title="Please Login to Yolo"/>
                                <CardContent>
                                    <form noValidate autoCapitalize="off" onSubmit={(e) => this.login(e)}>
                                        <TextField
                                            id="email"
                                            label="Enter your Email Address"
                                            name="email"
                                            type="email"
                                            fullWidth
                                            error={this.state.errors.email}
                                            helperText={this.state.errors.email}
                                            autoFocus
                                            required
                                            onChange={(e)=> this.change(e)}
                                            value={this.state.email}
                                        />
                                        <TextField
                                            id="password"
                                            label="Enter your password"
                                            name="password"
                                            fullWidth
                                            type="password"
                                            error={this.state.errors.password}
                                            helperText={this.state.errors.password}
                                            autoFocus
                                            required
                                            onChange={(e)=> this.change(e)}
                                            value={this.state.password}
                                            style={{marginBottom: 50}}
                                        />
                                    <Button variant="contained" type="submit" color="primary">Login</Button>
                                   </form>
                                </CardContent>
                                <CardActions>
                                    <label>New to Yolo ?</label>
                                    <Link onClick={this.navigateToRegister}>Sign Up</Link>
                                </CardActions>
                            </Card>
                        </Container>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={(e,r)=>this.handleClose(e,r)}
                    message={this.state.errorMessage}
                    action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={(e,r)=>this.handleClose(e,r)}>
                        Hide
                        </Button>
                    </React.Fragment>
                    }
                />
            </div>
        )
    }
}