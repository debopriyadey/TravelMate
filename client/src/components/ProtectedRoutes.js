import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';


export const ProtectedRoute = ({  component: Component,   ...rest}) => {
    const { user } = useSelector(state => state.userInfo);
    let loggedIn = false;
    if (user && Object.keys(user) !== 0) loggedIn = true;
    return (
        <Route
            {...rest}
            render={props => {
                if (loggedIn) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};