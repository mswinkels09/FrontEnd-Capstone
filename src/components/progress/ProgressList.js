//What the home page will look like with all the items listed
import React, { useContext, useEffect, useRef, useState } from "react"
import { Progress } from "./Progress";
import { UserContext } from "../users/UserProvider";
import { ConsumptionContext } from "../consumption/ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider";
import "./ProgressList.css";


export const ProgressList = props => {
    const { getUserConsumptions, getConsumptionByItem, itemConsumptions } = useContext(ConsumptionContext)
    const { getCurrentUser} = useContext(UserContext)
    const { getItems} = useContext(ItemContext)

    const currentUserId = parseInt(localStorage.getItem("user"))

    const itemsSelected = useRef(0)

    const userItemArray = itemConsumptions.filter(item => {
        const userItemFound = item.consumptions.find(c => {
            return c.userId === currentUserId
        }) || {}
        const userItemId = userItemFound.userId
        return userItemId
    })
    // const [filteredItems, setFilteredItems] = useState([])
    const [testVariable, setTestVariable] = useState([])
    const [defaultPage, setDefaultPage] = useState([])

    useEffect(() => {
        const userItemArray = itemConsumptions.filter(item => {
            const userItemFound = item.consumptions.find(c => {
                return c.userId === currentUserId
            }) || {}
            const userItemId = userItemFound.userId
            return userItemId
        })
        setTestVariable(userItemArray)

    }, [itemConsumptions])

    
    
    useEffect(() => {
        const itemFound = userItemArray.find(uia => {
            return uia.id === parseInt(testVariable.itemSelect)
        }) || {}
        setSelectedItem(itemFound)
    }, [testVariable])
    
    useEffect(() => {
        //set default representation on page render 
        if(parseInt(itemsSelected.current.value) === 0 ) {
            setDefaultPage(testVariable)
        } else{
            setDefaultPage(testVariable)
        }
    }, [itemsSelected])
    useEffect(() => {
        setDefaultPage(testVariable)
    }, [testVariable])

    
    const handleControlledInputChange = (browserEvent) => {
        let filteredArray = []
        const newTestVariable = Object.assign({}, testVariable)
        newTestVariable[browserEvent.target.name] = browserEvent.target.value
        console.log(newTestVariable, "newtestvariable")


        const userItemArray = itemConsumptions.filter(item => {
            const userItemFound = item.consumptions.find(c => {
                return c.userId === currentUserId
            }) || {}
            const userItemId = userItemFound.userId
            return userItemId
        })
        console.log(userItemArray, "useritemArray")

        
        const itemFound = userItemArray.find(uia => {
            return uia.id === parseInt(newTestVariable.itemSelect)
        }) || {}

        filteredArray.push(itemFound)
        console.log(filteredArray, "filteredarray")
        console.log(itemFound, "itemfound")

        setTestVariable(filteredArray)
    }
            
console.log(defaultPage, "defaultpage1")

    useEffect(() => {
        getItems()
        getConsumptionByItem()
        getCurrentUser()
        getUserConsumptions(currentUserId)
    }, [])

    return (
        <div>
            <header className="header progress__header">
                <h1>OVERALL PROGRESS</h1>
            </header>
            <article className="progressList">
                <fieldset>
                    <div className="div__add_consumption">
                        <select name="itemSelect" id="itemSelect" ref={itemsSelected}  className="form-control progress__form_select"
                            proptype="int"
                            defaultValue="0"
                            onChange={handleControlledInputChange}>

                            <option value="0">Item Select</option>
                            {userItemArray.map(item => (
                                <option key={item.id} value={item.id}>{item.name} - {item.size} oz</option>

                            ))}
                        </select>
                    </div>
                </fieldset>
                <section className="progress">

                {
                    defaultPage.map(item => {
                        let totalItemConsumption = 0
                        let totalCalories = 0
                        let totalSugarIntake = 0
                        let totalCost = 0

                        item.consumptions.forEach(consumption => {


                                totalItemConsumption += consumption.servings

                                totalCalories = item.calories * totalItemConsumption
                                totalSugarIntake = item.sugar * totalItemConsumption
                                totalCost = item.cost * totalItemConsumption

                            })
                            let hoursSinceConsumed = 0

                            const currentTime = new Date()

                            const sortedConsumptionTimes = item.consumptions.sort((a, b) => { return new Date(b.time) - new Date(a.time) })

                            sortedConsumptionTimes.find(consumption => {
                                const consumptionTime = new Date(consumption.time)
                                return hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime()) / (1000 * 60 * 60)).toFixed(1)
                            })
                            return <Progress key={item.id}
                                item={item}
                                calories={totalCalories}
                                sugar={totalSugarIntake}
                                cost={totalCost}
                                hours={hoursSinceConsumed}
                            />
                        })  

                    }
                
                </section>
                <div className="progress__btns">
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress/today")}>
                        Today
                    </button>
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress/week")}>
                        Week
                    </button>
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress/month")}>
                        Month
                    </button>
                </div>
            </article>
        </div>
    )
}


//179 - 180 information for the selected item is in the state variable itemSelected
//math similar to 160-175 
//