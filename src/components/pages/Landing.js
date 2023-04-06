import React from "react";
import "./Landing.css";
import img from "./images/PeopleDriving.jpg"

function Landing() {

    return(
        <div class="landing-overlay">
            <div class="landing-box">
                <div class="image-box">
                    <img class="landing-image" src={img}/>
                    <div class="text-box">
                        <h1>Welcome to UniRoute!</h1>
                        <h3>Created By: Christian Hart, Eric Rivas and Chandler Dugan</h3>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Landing;
