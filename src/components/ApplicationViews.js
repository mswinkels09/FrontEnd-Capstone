import React from "react"
import { Route } from "react-router-dom"
// import { ItemProvider } from "./items/ItemProvider";
// import { ItemList } from "./items/ItemList";

export const ApplicationViews = (props) => {
    return (
        <>
            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("kennel_customer")
                    props.history.push("/home")
                }
            } />
            {/* <ItemProvider>
                <Route exact path="/homepage">
                    <ItemList />
                </Route>
            </ItemProvider> */}
        </>
    )
}