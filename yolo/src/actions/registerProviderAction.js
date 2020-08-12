/**
 * @fileoverview Action for provider register.
 */

import {
    PROVIDER_REGISTER_IS_FAILURE,
    PROVIDER_REGISTER_IS_SUCCESS, 
    PROVIDER_REGISTER_LOADING_TOGGLE
} from '../types/provider';

export function providerRegister(
    fullName, password, 
    email, mobileNumber,Fees,City,country,ALine1,ALine2,
    PinCode,OrganizationName,OrganizationAddress, 
    OrganizationRegNumber, idType, 
    servicesOffered, providerIdentityImg, 
    partnerType, indCheckedForAPI, busCheckedForAPI) {
        return (dispatch) => {
            
            //dispatch(loading(true));
            return fetch('/api/auth/provider/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: fullName,
                    password: password,
                    email: email,
                    mobileNumber: mobileNumber,
                    Fees:Fees,
                    country: country,
                    City:City,
                    ALine1:ALine1,
                    ALine2:ALine2,
                    PinCode:PinCode,
                    OrganizationName: OrganizationName,
                    OrganizationAddress: OrganizationAddress,
                    OrganizationRegNumber: OrganizationRegNumber,
                    idType: idType,
                    busCheckedForAPI: busCheckedForAPI,
                    indCheckedForAPI:indCheckedForAPI,
                    servicesOffered: servicesOffered,
                    providerIdentityImg: providerIdentityImg,
                    partnerType: partnerType,
                    role: 2
                })
                
            }).then(res=> {
                if(res.status === 201) {
                    console.log('lets check it in res 201')
                    return res.json().then(res=> {
                        //dispatch(loading(false));
                        dispatch(isSuccess(res));
                    })
                } else if(res.status === 500) {
                    console.log('lets check it in res 500')
                   // dispatch(loading(false));
                    dispatch(isError('Something went wrong from our end. Please try again later.'))
                } else {
                    console.log('lets check it in res else')
                    //dispatch(loading(false));
                    return res.json().then(res=> {
                        dispatch(isError(res));
                    })
                }
            }).catch(err=> {
                console.log('lets check it in catch')
                //dispatch(loading(false));
                dispatch(isError(err));
            })
        }
}

export function loading(loading) {
    return {
        type: PROVIDER_REGISTER_LOADING_TOGGLE,
        payload: loading
    }
}

export function isSuccess(success) {
    return {
        type: PROVIDER_REGISTER_IS_SUCCESS,
        payload: success
    }
}

export function isError(err) {
    return {
        type: PROVIDER_REGISTER_IS_FAILURE,
        payload: err
    }
}