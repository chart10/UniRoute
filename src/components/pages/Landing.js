import React from "react";
import "./Landing.css";
import img from "./images/PeopleDriving.jpg";
import img2 from "./images/Directions Example.PNG";
import img3 from"./images/ProfileExample.png";

function Landing() {

    return(
        <div class="landing-overlay">
            <div class="landing-box">
                <div class="image-box">
                    <img class="landing-image" src={img}/>
                    <div class="text-box">
                        <h1 class="landing-text-header">Welcome to UniRoute!</h1>
                        <h3 class="landing-text-description">Created By: Christian Hart, Eric Rivas and Chandler Dugan</h3>
                    </div>
                </div>
                <div class="direction-image-box">
                    <img class="landing-direction-image" src={img2}/>
                    <div class="direction-image-text">
                        <h1 class="text-header">Get Directions to Wherever you Need!</h1>
                        <h3 class="text-description">Input your starting point, destination and arrival time to get where you need to go!</h3>
                    </div>
                </div>
                <div class="profile-image-box">
                    <div class="profile-image-text">
                        <h1 class="text-header">Save and Edit your Profile to Quickly map your Routes!</h1>
                        <h3 class="text-description">Save your frequent origins and destinations.</h3>
                        <h3 class="text-description-two">Save your weekly schedule to have your routes mapped out for the week!</h3>
                    </div>
                    <img class='profile-image' src={img3}/>
                </div>
            </div>
        </div>
    )

}

export default Landing;
