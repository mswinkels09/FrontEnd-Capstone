import React from "react"
import "../progress/ProgressList.css";


export const Trophy = ({ trophy }) => {

    return( 
        <section className="trophy">
            <h3 ><strong>
                <div className="trophy__name">
                    <div>{trophy.name}</div> 
                </div>
            </strong></h3>
        </section>
    ) 
}