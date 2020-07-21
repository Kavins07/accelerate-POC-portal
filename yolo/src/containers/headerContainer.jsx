import React from 'react';
import Header from '../components/shared/Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchProviderByName from '../actions/searchByNameAction';
import * as getCountriesAction from '../actions/getUtilsAction';
import * as getBusinessTypesAction from '../actions/getBusinessTypesAction';
import * as financialServicesAction from '../actions/getFinancialServiceAction';

class HeaderContainer extends React.Component {
    render() {
        return <Header 
            searchByName = {this.props.searchByName} 
            getCountriesList = {this.props.getCountriesList}
            getBusinessTypes = {this.props.getBusinessTypes}
            getFinancialServices = {this.props.getFinancialServices}
        />
    }
    
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        searchByName: searchProviderByName.searchProviderByName,
        getCountriesList: getCountriesAction.getCountriesList,
        getBusinessTypes: getBusinessTypesAction.getBusinessTypes,
        getFinancialServices: financialServicesAction.getFinancialServiceList
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(HeaderContainer);