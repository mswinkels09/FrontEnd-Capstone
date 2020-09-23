import React, { useContext, useRef, useEffect} from "react"
import { ConsumptionContext } from "./ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider"

export const ConsumptionForm = (props) => {
    const { addConsumption } = useContext(ConsumptionContext)
    const { items, getItems } = useContext(ItemContext)

    /*
        Create references that can be attached to the input
        fields in the form. This will allow you to get the
        value of the input fields later when the user clicks
        the save button.

        No more `document.querySelector()` in React.
    */
    const item = useRef(null)
    const servings = useRef(null)
    const time = useRef(null)

    /*
        Get animal state and location state on initialization.
    */
    useEffect(() => {
       getItems()
    }, [])

    const constructNewConsumption = () => {
        const usertime = time.current.value
        const itemId = parseInt(item.current.value)

        addConsumption({
            itemId,
            servings: parseInt(servings.current.value),
            time: usertime,
            userId: parseInt(localStorage.getItem("user"))

        })
        .then(() => props.history.push("/"))
    }

    return (
        <form className="newConsumptionForm">
            <header className="header">
                <h2 className="consumptionForm__title">Track Consumption</h2>
                <button className="btn__back_home" onClick={() => {
                    props.history.push("/")
                }}>Back</button>
            </header>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="itemName">Item name: </label>
                    <select defaultValue="" name="item" ref={item} id="itemConsumption" className="form-control" >
                        <option value="0">Select a item</option>
                        {items.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="servings">Number of servings consumed: </label>
                    <input type="number" id="consumptionServings" ref={servings} required autoFocus className="form-control" placeholder="servings" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time of consumption: </label>
                    <input type="datetime-local" id="consumptionTime" ref={time} required autoFocus className="form-control" placeholder="date and time" />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewConsumption()
                }}
                className="btn btn-primary">
                Submit
            </button>
            <button onClick={() => props.history.push("/new_item")}>
                Add Item
            </button>
        </form>
    )
}