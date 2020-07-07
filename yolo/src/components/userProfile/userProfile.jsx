import React from 'react';
import { Paper, Avatar, Icon,
     Container, Grid, Card, CardHeader, CardContent,
     TextField, Select, MenuItem, CardActions, Link, Button
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
            password: '',
            confirm_password: '',
            errorMessage: '',
            phone_number: '',
        }
    }

    delay = (ms) => new Promise(resolve =>
        setTimeout(resolve, ms)
    );

    componentDidMount() {
        document.title = 'Yoloj - User Profile';
        this.props.getUserDetails();
        this.props.getCountries();
            store.subscribe(()=>{
                this.setState({
                    userDetails: store.getState().getUserDetails.success
                })
                this.setState({
                    countries: store.getState().getCountries.countries
                })
            })
    }  

    handleTabChange = (e) => {
        console.log(e);
    }
   
    render() {
        return(
            <div style={{width: 900, marginLeft:300}}>
                <Paper square>
                    {
                        !this.state.userDetails.length ? <div>Please wait
                        </div> :
                        <div>
                            <div style={{paddingTop:200, height:'100%', width:'100%', position: 'absolute',top: 0, left: 0}} className="rootCont">
                                <Grid container>
                                    <Grid item  style={{marginLeft:300}}>
                                    <Card>
                                        <CardHeader title="User Profile" >
                                            
                                            </CardHeader>
                                        <CardContent>
                                            <AccountCircleTwoToneIcon
                                            color="primary" 
                                            style={{fontSize: 100}}
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
                                                    value = {this.state.userDetails[0].name}
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
                                                <Grid item xs={4} style={{display:'flex'}}>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={this.state.country_code}
                                                        style={{minWidth:150}}
                                                    >
                                                        {
                                                            (this.state.countries && this.state.countries.length) ? this.state.countries.map((item, index)=>{
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
                                                        style={{minWidth:800}}
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
            </div>
        )
    }
}
