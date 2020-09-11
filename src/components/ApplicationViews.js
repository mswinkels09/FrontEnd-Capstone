import React from "react"
import { ItemProvider } from "./items/ItemProvider";
import { ItemList } from "./items/ItemList";

export const ApplicationViews = (props) => {
    return (
        <>
            <Route path="/logout" render={
                (props) => {
                    localStorage.removeItem("kennel_customer")
                    props.history.push("/login")
                }
            } />

            <LocationProvider>
                <AnimalProvider>
                    <EmployeeProvider>
                        <Route exact path="/">
                            <LocationList />
                        </Route>
                        <Route path="/locations/:locationId(\d+)" render={
                            props => <LocationDetail {...props} />
                        } />
                    </EmployeeProvider>
                </AnimalProvider>
                {/* Render the location list when http://localhost:3000/ */}
            </LocationProvider>
        </>
    )
}