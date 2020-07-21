import React from 'react';
import { 
    ExpansionPanel, ExpansionPanelDetails,
    ExpansionPanelSummary,ExpansionPanelActions,
    Chip, Button, Divider, Icon, Typography,
    Snackbar
} from '@material-ui/core';
import { store } from '../../store';

export default class AdminApproval extends React.Component {

    constructor(props) {
        super();
        this.state = {
            unapprovedProviders: [],
            open: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        document.title = "Yoloj - Admin Approval Panel";
        this.props.getProviderList();
        store.subscribe(()=> {
            this.setState({unapprovedProviders: store.getState().getUnapproved.success});
        })
    }

    handleAccept = (email, state) => {
        this.props.approveProvider(email, state);
        store.subscribe(()=>{
            if(store.getState().approveProvider.error) {
                this.setState({open: true});
                this.setState({errorMessage: store.getState().approveProvider.error});
            } else {
                this.setState({open: true});
                this.setState({errorMessage: "Provider successfully Approved"});
            }
        })
        this.props.getProviderList();
    }

    handleReject = (email, state) => {
        this.props.approveProvider(email, state);
    }

    handleClose = (e, r) => {
        this.setState({open: false});
    }

    render() {
        return(
            <div style={{maxWidth:600, marginLeft:500}}>
                {
                    (this.state.unapprovedProviders && this.state.unapprovedProviders.length) ? this.state.unapprovedProviders.map((item, index)=> {
                        return (
                            <ExpansionPanel key={index}>
                                <ExpansionPanelSummary
                                    expandIcon={<Icon className="fa fa-sort-desc" aria-hidden="true"/>}>
                                    <Typography>{item.OrganizationName}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <span>Organization Address: {item.OrganizationAddress}</span>
                                </ExpansionPanelDetails>
                                <Divider />
                                <ExpansionPanelActions>
                                    <Button variant="contained" color="primary" onClick={() => this.handleAccept(item.email, true)}>Approve</Button>
                                    <Button variant="contained" color="secondary" onClick={() => this.handleReject(item.email, false)}>Reject</Button>
                                </ExpansionPanelActions>
                            </ExpansionPanel>
                        )
                    }) : <span>No new Providers to approve.</span>
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    handleClose={(e,r)=>this.handleClose(e, r)}
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