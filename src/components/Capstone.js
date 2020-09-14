import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./navbar/NavBar"
import { Login } from "./auth/Login"
import { Home } from "./auth/Home";
import { Register } from "./auth/Register"

export const Capstone = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("user")) {
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/home" />
            }
        }} />
        <Route path="/home" render={props => <Home {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)