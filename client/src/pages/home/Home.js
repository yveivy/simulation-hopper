import {gsap} from 'gsap'
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_MATCHUPS } from '../utils/queries';

// import "./css/home.css"
{/* <script src="./js/gameboard.js"></script>
<script src="./js/infographic.js"></script> */}
// <title>Simulation Hopper</title>

const Home = () => {
  const navigate = useNavigate()
  const animateTheIntroZoom = () => {
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
        navigate('/play')
      }
    });

    gsap.to("#handheldNintendoContainer", {
      duration: 3,
      scale: 3,
      opacity: .3,
      onComplete: function () {
        // window.location.href = "/game";
        navigate('/play')
      }
    });
  };

  return (
    <div className='wrapper'>
      <header>
        <h1>Simulation Hopper</h1>
      </header>
      <div id="handheldNintendoContainer">

          {/* <div id="infoGraphic" style="display: none"></div> */}
          <div id="startGame" onClick={animateTheIntroZoom}></div>

          <div id="info"></div>

      </div>

  
    </div>
  );
};

export default Home;
