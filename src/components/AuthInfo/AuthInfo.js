import React from 'react';
import { AUTH_INFO } from '../../Queries';
import { Query } from 'react-apollo';

const AuthInfo = props => (
    <Query query={ AUTH_INFO } >
        {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return <p>Error...</p>

            const authData = data.auth_info.account;
    
            return (
                <>
                    <div className="ava-cont">
                        <div className="row">
                            <div className="col-4">
                                <div className="ava"><img className="ava_img" alt="ava" src={authData.small_avatar} /></div>
                            </div>
                            <div className="col-8 align-self-center">
                                <div>Login: {authData.login}</div>                    
                                <div>Rating = {authData.orders_statistics.rating}</div>
                            </div>
                        </div>
                    </div>
                </>    
            )
        }}
    </Query>
)

export default AuthInfo;