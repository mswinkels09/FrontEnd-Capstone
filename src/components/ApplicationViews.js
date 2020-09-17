import React from "react"
import { Route } from "react-router-dom"
import { ItemProvider } from "./items/ItemProvider";
import { ItemList } from "./items/ItemList";
import { ItemForm } from "./items/ItemForm";
import { ConsumptionProvider } from "./consumption/ConsumptionProvider";
import { ConsumptionForm } from "./consumption/ConsumptionForm";
import { UserProvider } from "./users/UserProvider";
import { ProgressList } from "./progress/ProgressList";

export const ApplicationViews = (props) => {
    return (
        <>
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
                        <Route path="/progress" render={
                            props => <ProgressList {...props}/>
                        } />
                        {/* <Route path="/:itemId(\d+)" render={
                            props => <ItemDetail {...props} />
                        } /> */}
                    </ConsumptionProvider>
                </ItemProvider>
            </UserProvider>
        </>
    )
}