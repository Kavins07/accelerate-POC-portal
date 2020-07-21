import React from 'react';
import HeaderContainer from '../../containers/headerContainer';
import { 
    Button, Snackbar, Grid,
    Card, Avatar, CardActionArea,
} from '@material-ui/core';
import './Home.css';
import { Rating } from '@material-ui/lab';
import { store } from '../../store';
import CardErrorBoundary from '../shared/CardErrorBoundary';
import log from '../../utils/logger.service'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {Link} from 'react-router-dom';
import { classList } from '@syncfusion/ej2-base';

export default class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            errorMessage: '',
            providerData: [],
            location: '',
            dialogOpen: false,
            name: ''
        }
    }
    componentDidMount () {
        document.title = 'Welcome to Infosys - Yolo Network';
        this.props.getAllProvider();
        store.subscribe(()=>{
            if(store.getState().getAllApprovedProvider.error) {
                this.setState({
                    open: true
                })
                this.setState({
                    errorMessage: String( store.getState().getAllApprovedProvider.error)
                })
            } else {
                this.setState({
                    providerData: store.getState().getAllApprovedProvider.success
                })
            }
        })
    }
    
  

    change = (e) => {
        const { name, value } = e.target;
        switch(name) {
            case 'location':
                this.setState({location: value});
            break;
            case 'name':
                this.setState({name: value});
                break;
            default:
                break;
        }
    }

    handleClose = () => {
        this.setState({dialogOpen: false})
    }

    handleClickOpen = () => {
        this.setState({dialogOpen: true});
    }

    render() {
        return(
            <div>
                <HeaderContainer />
                <Grid container spacing={24} style={{marginTop:200, marginLeft: 200}}>
                    {
                        (this.state.providerData && this.state.providerData.length) ? this.state.providerData.map((itemz, index)=> {
                            return (
                        <div className ="Column">
                        <div className="profile_container">
                        <div className="profile_card">

                        <div className="profile_img">
                             <img src ={itemz.providerIdentityImg} ></img> 
                        </div>
                        
                        <div className="profile_company">
                            <p>{itemz.OrganizationName}</p>
                        </div>

                        <div className="profile_company">
                            <p>{itemz.partnerId}</p>
                        </div>

                        <div className="profile_title">
                            <p>{itemz.fullName}</p>

                            <CheckCircleOutlineIcon style={{ color: 'green' }}></CheckCircleOutlineIcon>
                        </div>
                        
                        <div className="profile_desc">
                             <p>Expertise: {itemz.partnerType[0].name}</p> 
                            <Link  to = {`/provider/profile?id=${itemz.partnerId}`}>See More</Link>
                            
                        </div>
                        
                         
                        <div className="profile_action">
                            <Button color="secondary" size="small">Contact Us</Button>
                            <Link to={`/provider/profile?id=${itemz.partnerId}`}>
                            <Button color="primary" size="small">View Profile</Button>
                            </Link>
                            
                        </div>
                        <div className="profile_company">
                            <p>Fees : $100</p>
                        </div>
                    </div>
                    </div>
                    </div>

                                
                        )
                        }) : <span>We do not have enough data right now. Please check back later.</span>
                    }
                </Grid>
    
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