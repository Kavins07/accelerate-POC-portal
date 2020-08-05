import React from 'react';
import {
    Paper, Avatar, Icon,
    Container, Grid, Card, CardHeader, CardContent,
    TextField, Select, MenuItem, CardActions, Link, Button, Snackbar
} from '@material-ui/core';
import { store } from '../../store';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';

export default class UserProfile extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tabValue: 0,
            userDetails: [],
            countries: [],
            name: '',
            email: '',
            photo: '',
            password: '',
            confirm_password: '',
            errorMessage: '',
            countries_code: '',
            phone_number: '',
            disableName: true,
            disableEmail: true,
            disableNumber: true,
            open: false,
            errors: {
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                phone_number: '',
                message: ''
            },
            updateDetails: true
        }
    }

    delay = (ms) => new Promise(resolve =>
        setTimeout(resolve, ms)
    );

    componentDidMount() {
        document.title = 'Yoloj - User Profile';
        this.props.getUserDetails();
        this.props.getCountries();
        store.subscribe(() => {
            this.setState({
                userDetails: store.getState().getUserDetails.success
            })
            this.setState({
                countries: store.getState().getCountries.countries
            })
        })
        // if (history.location.pathname !== '/login' || '/register' ) {
        //     setIsLoggedIn(true);
        // }
        if (localStorage.getItem('userProfile') === 'false') {
            setTimeout(() => {
                this.setState({
                    name: this.state.userDetails[0].name,
                    email: this.state.userDetails[0].email,
                    phone_number: this.state.userDetails[0].phone_number.slice(-10,),
                    countries_code: this.state.userDetails[0].phone_number.slice(0, -10),
                })
            }, 1000);
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
        window.location.reload();
    };

    change = (e) => {
        const { name, value } = e.target;
        // console.log(this.state.countries_code);
        let errors = this.state.errors;
        switch (name) {
            case 'name':
                // errors.name = value.length < 3 ? 'Name should be more than 3 characters long': null;
                if (value.length < 3) {
                    errors.name = 'Name should be more than 3 characters long'
                } else {
                    this.setState({ name: value });
                    errors.name = '';
                }
                break;
            case 'email':
                // errors.email = value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) ? '' : 'Invalid Email Address';
                if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                    errors.email = 'Invalid Email Address';
                } else {
                    this.setState({ email: value });
                    errors.email = '';
                }
                break;
            case 'phone_number':
                // errors.phone_number = value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? '' : 'Invalid phone number.';
                if (!value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
                    errors.phone_number = 'Invalid phone number.';
                } else {
                    this.setState({ phone_number: value });
                    errors.phone_number = '';
                }
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value }, () => {
            return null;
        });
        this.handleUpdate();
    }

    //UI part is done need to work on put and 
    updateProfile = (e) => {
        e.preventDefault();
        this.props.userUpdate(this.state.email, this.state.name, this.state.phone_number, this.state.country_code, this.state.photo);
        store.subscribe(() => {
            if (store.getState().userUpdate.error) {
                this.setState({ open: true });
                this.setState({
                    errorMessage: store.getState().userUpdate.error
                })
            } else {
                // history.push('/');
                // window.location.reload();
            }
        })
    }

    handleUpdate = () => {
        // console.log('inside func')
        if (this.state.disableName === false || this.state.disableEmail === false || this.state.disableNumber === false) {
            // console.log('inside first ')
            if (this.state.errors.name == "" && this.state.errors.email == "" && this.state.errors.phone_number == "") {
                // console.log('inside third')
                this.setState({ updateDetails: false });
            } else {

                this.setState({ updateDetails: true });
            }
        }
        // console.log(this.state.disableName);

    }


    // handleTabChange = (e) => {
    //     console.log(e);
    // }

    handleAccessCode = (e) => {
        // console.log( e.target.value);
        this.setState({ countries_code: e.target.value });
    }
    handleBack = () => {

    }

    render() {
        return (
            <div style={{ width: 900, marginLeft: 300 }}>
                <Paper square>
                    {
                        !this.state.userDetails.length ? <div>Please wait
                        </div> :
                            <div>
                                <div style={{ paddingTop: 200, height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }} className="rootCont">
                                    <Grid container>
                                        <Grid item style={{ marginLeft: 300 }}>
                                            <Card>
                                                <CardHeader title="User Profile" >

                                                </CardHeader>
                                                <CardContent>
                                                    <AccountCircleTwoToneIcon
                                                        color="primary"
                                                        style={{ fontSize: 100 }}
                                                    />
                                                    {/* <Avatar style={{marginLeft:400}}>{this.state.userDetails[0].name}</Avatar> */}
                                                    <form noValidate autoCapitalize="off">
                                                        <TextField
                                                            id="name"
                                                            label="Enter your Name"
                                                            name="name"
                                                            fullWidth
                                                            type="text"
                                                            autoFocus
                                                            required
                                                            value={this.state.userDetails[0].name}
                                                        />
                                                        <TextField
                                                            id="email"
                                                            label="Enter your email"
                                                            name="email"
                                                            fullWidth
                                                            type="email"
                                                            value={this.state.userDetails[0].email}
                                                            autoFocus
                                                            required
                                                        />
                                                        <Grid item xs={4} style={{ display: 'flex' }}>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={this.state.country_code}
                                                                style={{ minWidth: 150 }}
                                                            >
                                                                {
                                                                    (this.state.countries && this.state.countries.length) ? this.state.countries.map((item, index) => {
                                                                        return <MenuItem key={index} value={item.dial_code} autoWidth={true}>{item.dial_code}</MenuItem>
                                                                    }) : <span>Loading</span>
                                                                }
                                                            </Select>
                                                            <TextField
                                                                id="phone_number"
                                                                label="Enter your Phone number"
                                                                name="phone_number"
                                                                fullWidth
                                                                className="phoneNumber"
                                                                value={this.state.userDetails[0].phone_number}
                                                                autoFocus
                                                                required
                                                                style={{ minWidth: 800 }}
                                                            />
                                                        </Grid>
                                                        <br />
                                                        <Button variant="contained" type="submit" color="primary">Update</Button>
                                                    </form>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                    }
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={(e, r) => this.handleClose(e, r)}
                    message={this.state.errorMessage}
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={(e, r) => this.handleClose(e, r)}>
                                Hide
                        </Button>
                        </React.Fragment>
                    }
                />
            </div>
        )
    }
}
