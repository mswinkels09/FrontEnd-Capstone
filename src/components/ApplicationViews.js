import React from "react"
import { Route } from "react-router-dom"
import { ItemProvider } from "./items/ItemProvider";
import { ItemList } from "./items/ItemList";
import { ItemForm } from "./items/ItemForm";
import { SizeProvider } from "./sizes/SizeProvider";

export const ApplicationViews = (props) => {
    return (
        <>
            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("user")
                    props.history.push("/home")
                }
            } />

            <ItemProvider>
                <SizeProvider>
                    <Route exact path="/" render={
                        props => <ItemList {...props} />
                    } />
                    <Route path="/create__new_item" render={
                        props => <ItemForm {...props}/>
                    } />
                    {/* <Route path="/:itemId(\d+)" render={
                        props => <ItemDetail {...props} />
                    } /> */}
                </SizeProvider>
            </ItemProvider>
        </>
    )
}