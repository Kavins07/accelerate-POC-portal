import React from 'react';
import Home from '../components/Home/Home';
import { connect } from 'react-redux';
import * as searchProviderByName from '../actions/searchByNameAction';
import * as getApprovedProviders from '../actions/getAllProvidersActions';
import { bindActionCreators } from 'redux';
class HomeContainer extends React.Component {
    render() {
        return <Home 
            searchByName = {this.props.searchByName}
            getAllProvider = {this.props.getAllProvider}
        />
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        searchByName: searchProviderByName.searchProviderByName,
        getAllProvider: getApprovedProviders.getAllProviders
    }, dispatch)
} 

export default connect(null, mapDispatchToProps)(HomeContainer)