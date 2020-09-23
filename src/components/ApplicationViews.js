import React from "react"
import { Route } from "react-router-dom"
import { Register } from "./auth/Register";
import { Login } from "./auth/Login";
import { ItemProvider } from "./items/ItemProvider";
import { ItemList } from "./items/ItemList";
import { ItemForm } from "./items/ItemForm";
import { ItemDetail } from "./items/ItemDetail";
import { ConsumptionProvider } from "./consumption/ConsumptionProvider";
import { ConsumptionForm } from "./consumption/ConsumptionForm";
import { UserProvider } from "./users/UserProvider";
import { ProgressList } from "./progress/ProgressList";
import { TodayProgressList } from "./progress/TodayProgressList";
import { MonthProgressList } from "./progress/MonthProgressList";
import { WeekProgressList } from "./progress/WeekProgressList";


export const ApplicationViews = (props) => {
    return (
        <>
            <Route path="/login" render={
                props => <Login {...props} />
            } />
            <Route path="/register" render={
                props => <Register {...props} />
            } />
            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("user")
                    props.history.push("/home")
                }
            } />
            <UserProvider>
                <ItemProvider>
                    <ConsumptionProvider>
                        <Route exact path="/" render={
                            props => <ItemList {...props} />
                        } />
                        <Route path="/new_item" render={
                            props => <ItemForm {...props}/>
                        } />
                        <Route path="/track_consumption" render={
                            props => <ConsumptionForm {...props}/>
                        } />
                        <Route exact path="/progress" render={
                            props => <ProgressList {...props}/>
                        } />
                        <Route path="/:itemId(\d+)" render={
                            props => <ItemDetail {...props} />
                        } />
                        <Route path="/edit/:itemId(\d+)" render={
                            props => <ItemForm {...props} />
                        } /> 
                        <Route path="/progress/today" render={
                            props => <TodayProgressList {...props} />
                        } /> 
                        <Route path="/progress/month" render={
                            props => <MonthProgressList {...props} />
                        } /> 
                        <Route path="/progress/week" render={
                            props => <WeekProgressList {...props} />
                        } /> 
                    </ConsumptionProvider>
                </ItemProvider>
            </UserProvider>
        </>
    )
}