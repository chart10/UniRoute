import React from 'react';
import './Landing.css';
import img from './images/PeopleDriving.jpg';
import img2 from './images/Directions Example.PNG';
import img3 from './images/ProfileExample.png';

function Landing() {
  return (
    <article>
      <div id='blue-gradient'></div>
      <section id='landing-page1'>
        <div id='text-box'>
          <h1 id='landing-text-title'>Welcome to UniRoute!</h1>
          <h3 id='landing-text-description'>
            A one-page application for Univerity commuters
          </h3>
        </div>
      </section>

      <section id='landing-page2'>
        <img id='directions-img' src={img2} />
        <div class='text-container'>
          <h1>Get Directions to Wherever you Need!</h1>
          <h3>
            Input your starting point, destination and arrival time to get where
            you need to go!
          </h3>
        </div>
      </section>
      <section id='landing-page3'>
        <div class='text-container'>
          <h1>Save and Edit your Profile to Quickly map your Routes!</h1>
          <h3>Save your frequent origins and destinations.</h3>
          <h3>
            Save your weekly schedule to have your routes mapped out for the
            week!
          </h3>
        </div>
        <img id='profile-img' src={img3} />
      </section>
      <section id='credits'>
        <div className='designer'>
          <img src='./images/suavearabic.jpg' alt='Pic of Eric Rivas' />
          <h3>Eric Rivas</h3>
          <img src='./images/ssbsk.jpg' alt='Pic of Eric Rivas' />
          <h3>Chandler Dugan</h3>
          <img src='./images/suavearabic.jpg' alt='Pic of Eric Rivas' />
          <h3>Eric Rivas</h3>
        </div>
      </section>
    </article>
  );
}

export default Landing;
