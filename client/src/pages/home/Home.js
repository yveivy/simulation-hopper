import {gsap} from 'gsap'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import miniMap from '../../images/MiniMapWithNames.png';
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
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () =>{
    localStorage.removeItem('nekotsresueht');
    setIsLoggedIn(false)
  }
    useEffect(() => {
        const currentToken = localStorage.getItem('nekotsresueht');
        if (currentToken === null) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true)
        }
        console.log("Home.js currentToken, isLoggedIn___________", currentToken, isLoggedIn)
    }, []);

  function toggleCredits() {
    setShowCredits(!showCredits)
  }
  const animateTheIntroZoom = () => {
    const currentToken = localStorage.getItem('nekotsresueht');
    console.log('currentToken', currentToken);
    if (currentToken === null) {
      navigate('/login');
      return
    }
    console.log('animateTheIntroZoom click event_________')
    var tl = gsap.timeline();

    tl.to("#infoButton", {
      opacity: 0,
      duration: 1
    });

    tl.to("#handheldNintendo", {
      duration: 3,
      scale: 3,
      opacity: 0,
      onComplete: function () {
        showGameHideNintendo()
      }
    });

    gsap.to("#handheldNintendoContainer", {
      duration: 3,
      scale: 3,
      opacity: .3,
      onComplete: function () {
        showGameHideNintendo()
      }
    });
  };

  const showNintendoHideGame = () => {
    const gameBoardDiv = document.getElementById('gameBoard');
    const gameInstructionsDiv = document.getElementById('game-instructions-react-root');
    gameInstructionsDiv.style.display = 'none';
    gameBoardDiv.style.display = 'none';
    setShowNintendo(true)
  }

  const showGameHideNintendo = () => {
    const gameBoardDiv = document.getElementById('gameBoard');
    const gameInstructionsDiv = document.getElementById('game-instructions-react-root');
    gameInstructionsDiv.style.display = 'flex';
    gameBoardDiv.style.display = 'flex';
    setShowNintendo(false)
  }

  const instructionsStyle = {
    color: "white", 
    fontSize: "30px",
    display: "block",
    margin: "3px"
  }

  return (
    <div className='wrapper'>
      <header>
        <h1 onClick ={showNintendoHideGame} >Simulation Hopper</h1>
        { (isLoggedIn===true) &&
          <a style={{color:"white", textDecoration: 'white'}} onClick={logout} href="/">logout</a>
        }
        { (isLoggedIn===false) &&
          <a style={{color:"white", textDecoration: 'white'}} href="/login">Login</a>
        }
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

      {/* {!showNintendo &&
        <div style={{zIndex: "10000", display:"flex", flexDirection:"column", margin: '50px'}}>
          <p style={instructionsStyle}>Press "spacebar" when near an NPC or near your spaceship to interact.</p>
          <br />
          <p style={instructionsStyle}>Press the "r" key at any time ask your robot sidekick for help.</p>
          <p style={instructionsStyle}>Robot knows everything Barf needs to know to leave the planet.</p>
          <br />
          <p style={instructionsStyle}>Press "e" to view your inventory.</p>
          <br />
          <p style={instructionsStyle}>Use "w" "a" "s" "d" keys to move Barf.</p>
          <img style={{alignSelf: 'center', border: "3px solid white", borderRadius: '10px', margin: '25px'}} src={miniMap} alt="minimap" />
        </div>
      } */}
  
    </div>
  );
};

export default Home;
