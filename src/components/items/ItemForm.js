import React, { useContext, useRef, useEffect, useState } from "react"
import { ItemContext } from "./ItemProvider"
import "./ItemForms.css";

export const ItemForm = (props) => {
    const { addItem, items, updateItem, getItems } = useContext(ItemContext)


    const [item, setItem] = useState({})
    /*
        Create references that can be attached to the input
        fields in the form. This will allow you to get the
        value of the input fields later when the user clicks
        the save button.

        No more `document.querySelector()` in React.
    */

   const editMode = props.match.params.hasOwnProperty("itemId")

   const handleControlledInputChange = (event) => {
    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
        const newItem = Object.assign({}, item)
        newItem[event.target.id] = event.target.value
        setItem(newItem)
    }

    const getItemInEditMode = () => {
        if (editMode) {
            const itemId = parseInt(props.match.params.itemId)
            const selectedItem = items.find(i => i.id === itemId) || {}
            setItem(selectedItem)
        }
    }

    // Get animals from API when component initializes
    useEffect(() => {
        getItems()
    }, [])

    // Once provider state is updated, determine the animal (if edit)
    useEffect(() => {
        getItemInEditMode()
    }, [items])

    const name = useRef(null)
    const size = useRef(null)
    const servings = useRef(null)
    const calories = useRef(null)
    const sugar = useRef(null)
    const cost = useRef(null)

    /*
        Get animal state and location state on initialization.
    */

    const constructNewItem = () => {
        if(editMode) {
            updateItem({
                id: item.id,
                name: name.current.value,
                size: parseInt(size.current.value),
                servings: parseInt(servings.current.value),
                calories: parseInt(calories.current.value),
                sugar: parseInt(sugar.current.value),
                cost: parseInt(cost.current.value)
            })
            .then(() => props.history.push(`/${item.id}`))
        } else {
            addItem({
                    name: name.current.value,
                    size: parseInt(size.current.value),
                    servings: parseInt(servings.current.value),
                    calories: parseInt(calories.current.value),
                    sugar: parseInt(sugar.current.value),
                    cost: parseInt(cost.current.value)
                })
                .then(() => props.history.push("/track_consumption"))
                }
        }

    return (
        <form className="newItemForm">
            <header className="header">
                <h1 className="itemForm__title pageTitle">NEW ITEM</h1>
                <button className="btn__back btn" onClick={() => {
                    props.history.push("/track_consumption")
                }}>Back</button>
            </header>
            <main className="main">
                <div className="form--addItem form--item">
                    <fieldset>
                        <div className="form-group">
                            <input type="text" id="itemName" ref={name} required autoFocus className="form-control item__form"
                            proptype="varchar" 
                            placeholder="Item name" 
                            defaultValue={item.name} 
                            onChange={handleControlledInputChange}/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <input type="number" id="itemSize" ref={size} required autoFocus className="form-control item__form" 
                            placeholder="Item size in oz"
                            defaultValue={item.size}
                            onChange={handleControlledInputChange}/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <input type="number" id="itemServings" ref={servings} required autoFocus className="form-control item__form" 
                            placeholder="Total number of servings"
                            defaultValue={item.servings}
                            onChange={handleControlledInputChange}/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <input type="number" id="itemCalories" ref={calories} required autoFocus className="form-control item__form" 
                            placeholder="Calories per serving" 
                            defaultValue={item.calories}
                            onChange={handleControlledInputChange}/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <input type="number" id="itemSugar" ref={sugar} required autoFocus className="form-control item__form" 
                            placeholder="Sugar amount" 
                            defaultValue={item.sugar}
                            onChange={handleControlledInputChange}/>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group ">
                            <input type="text" id="itemCost" ref={cost} required autoFocus className="form-control item__form" 
                            placeholder="Item cost"
                            defaultValue={item.cost}
                            onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <button type="submit"
                        onClick={evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            constructNewItem()
                        }}
                        className="btn btn__item">
                        {editMode ? "Save" : "Submit"}
                        
                    </button>
                </div>
            </main>
        </form>
    )
}