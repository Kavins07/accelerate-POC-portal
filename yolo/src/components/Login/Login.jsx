import React from 'react';
import HeaderContainer from '../../containers/headerContainer';
import './Login.css';
import { 
    Grid, Container,
    Card,
    TextField, CardHeader,
    CardContent, CardActions,
    Snackbar, Button, Link
} from '@material-ui/core';
import { history, store } from '../../store';

export default class Login extends React.Component {

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
        document.title = 'Yolo - Login';
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open: false});
    };
    
    navigateToRegister = () => {
        history.push('/register');
    }

    login = (e) => {
        e.preventDefault();
        this.props.userLogin(this.state.email, this.state.password);
        store.subscribe(()=> {
            if(store.getState().userLogin.error) {
                this.setState({
                    open: true
                })
                this.setState({
                    errorMessage: store.getState().userLogin.error
                })
            }
            if(store.getState().userLogin.success.status === true) {
                window.localStorage.setItem('token', store.getState().userLogin.success.token);
                this.setState({
                    open: false
                });
                window.localStorage.setItem('userProfile', true);
                window.location.reload(false);
                history.push('/dashboard');
            }
        })
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

    render() {
        return(
            <div>
                <HeaderContainer />
                <Grid container
                    className="rootLoginHead"
                    alignItems="center"
                    justify="center"
                    alignContent="center">
                    <Grid item
                        xs={12} 
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
                                            className="labelRoot"
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
                                            style={{marginBottom: 50}}
                                            value={this.state.password}
                                    />
                                    <Button variant="contained" type="submit">Login</Button>
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