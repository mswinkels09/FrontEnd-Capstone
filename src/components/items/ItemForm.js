import React, { useContext, useRef, useEffect, useState } from "react"
import { ItemContext } from "./ItemProvider"

export const ItemForm = (props) => {
    const { addItem } = useContext(ItemContext)


    const [item, setItem] = useState({})
    /*
        Create references that can be attached to the input
        fields in the form. This will allow you to get the
        value of the input fields later when the user clicks
        the save button.

        No more `document.querySelector()` in React.
    */
    const name = useRef(null)
    const size = useRef(null)
    const calories = useRef(null)
    const sugar = useRef(null)
    const cost = useRef(null)

    /*
        Get animal state and location state on initialization.
    */

    const constructNewItem = () => {
    addItem({
            userId: parseInt(localStorage.getItem("user")),
            name: name.current.value,
            size: parseInt(size.current.value),
            calories: parseInt(calories.current.value),
            sugar: parseInt(sugar.current.value),
            cost: parseInt(cost.current.value)
        })
        .then(() => props.history.push("/"))
        }

    return (
        <form className="newItemForm">
            <header className="header">
                <h1 className="itemForm__title">New Item</h1>
                <button className="btn__back_consumption" onClick={() => {
                    props.history.push("/track_consumption")
                }}>X</button>
            </header>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="itemName">Item name: </label>
                    <input type="text" id="itemName" ref={name} required autoFocus className="form-control" placeholder="Item name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Item size: </label>
                    <input type="number" id="itemSize" ref={size} required autoFocus className="form-control" placeholder="Item size in oz" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="calories">Number of Calories per serving: </label>
                    <input type="number" id="itemCalories" ref={calories} required autoFocus className="form-control" placeholder="Calories per serving" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Grams of sugar per serving: </label>
                    <input type="number" id="itemSugar" ref={sugar} required autoFocus className="form-control" placeholder="sugar amount" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Cost of item: $</label>
                    <input type="text" id="itemCost" ref={cost} required autoFocus className="form-control" placeholder="Item cost" />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewItem()
                }}
                className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}