import React from 'react';
import AdminHeader from '../shared/adminHeader/adminHeader';
import AdminApprovalContainer from '../../containers/adminApprovalContainer';

export default class AdminDashboard extends React.Component {

    constructor(props) {
        super();
        this.state = {
            unapprovedProviders: []
        }
    }

    componentDidMount() {
        document.title = 'Yoloj - Admin Dashboard';
    }

    render() {
        return (
            <div>
                <AdminHeader />
                <div style={{paddingTop:200}}>
                    <AdminApprovalContainer unapprovedList={this.state.unapprovedProviders}/>
                </div>
            </div>
        )
    }
}