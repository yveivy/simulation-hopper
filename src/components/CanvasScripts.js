import { Helmet } from "react-helmet"
import React from "react"

class CanvasScripts extends React.Component {
  render() {
    return (
      <div className="CanvasGameStuff">
        <Helmet>
         

         
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"
            integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ=="
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>"
          <script src="js/interactionsZones2.js"></script>
          <script src="js/classes.js"></script>
          <script src="js/collisions1.js"></script>
          <script src="js/gameboard.js"></script>
          <script type="module" src="js/ai.js"></script>
          <script type="module" src="js/inputMenu.js"></script>

        </Helmet>
        ...
      </div>
    );
  }
}
export default CanvasScripts;