import {gsap} from 'gsap'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';

// import "./css/home.css"
{/* <script src="./js/gameboard.js"></script>
<script src="./js/infographic.js"></script> */}
// <title>Simulation Hopper</title>


const Home = () => {
  const [showCredits, setShowCredits] = useState(false)
  const [showNintendo, setShowNintendo] = useState(true)


  const navigate = useNavigate()
  function toggleCredits() {
    setShowCredits(!showCredits)
  }
  const animateTheIntroZoom = () => {
    const rootDiv = document.getElementById('root');
    const gameBoardDiv = document.getElementById('gameBoard');
    console.log('animateTheIntroZoom click event_________')
    var tl = gsap.timeline();

    tl.to("#infoButton", {
      opacity: 0,
      duration: 1
    });

    // tl.to(startGame.current, {
    //   opacity: 0,
    //   duration: 1
    // });

    tl.to("#handheldNintendo", {
      duration: 3,
      scale: 3,
      opacity: 0,
      onComplete: function () {
        // window.location.href = "/game";
        // navigate('/play')
        // rootDiv.style.display = 'none';
        showGameHideNintendo()
      }
    });

    gsap.to("#handheldNintendoContainer", {
      duration: 3,
      scale: 3,
      opacity: .3,
      onComplete: function () {
        // window.location.href = "/game";
        // navigate('/play')
        // rootDiv.style.display = 'none';
        showGameHideNintendo()
      }
    });
  };

  const showNintendoHideGame = () => {
    const gameBoardDiv = document.getElementById('gameBoard');
    gameBoardDiv.style.display = 'none';
    setShowNintendo(true)
  }

  const showGameHideNintendo = () => {
    const gameBoardDiv = document.getElementById('gameBoard');
    gameBoardDiv.style.display = 'flex';
    setShowNintendo(false)
  }

  return (
    <div className='wrapper'>
      <header>
        <h1 onClick ={showNintendoHideGame} >Simulation Hopper</h1>
        <a style={{color:"white", textDecoration: 'white'}}href="/login">Login</a>
      </header>
      {showNintendo &&
      <div id="handheldNintendoContainer">

          <div id="infoGraphix" style={{ display: showCredits ? "block" : "none" }}>
            <center>
              <h2>Meet the Creators:</h2>
              <p><a href="https://www.linkedin.com/in/j-seybold-0a737627a/" target="_blank" rel="noopener noreferrer">J Seybold</a></p>
              <p><a href="https://www.linkedin.com/in/edward-wells87/" target="_blank" rel="noopener noreferrer">Edward Wells</a></p>
              <p><a href="https://www.linkedin.com/in/yevette-hunt/" target="_blank" rel="noopener noreferrer">Yevette Hunt</a></p>
              <p><a href="https://www.linkedin.com/in/willrcline/" target="_blank" rel="noopener noreferrer">Will R Cline</a></p>
            </center>
          </div>
          <div id="startGame" onClick={animateTheIntroZoom}></div>

          <div id="info" onClick={toggleCredits}></div>

      </div>
      } 
  
    </div>
  );
};

export default Home;
