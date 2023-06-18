import React, {useState} from "react"
import "../../../css/overlay1.css"
import "../../../css/special-features.css"
// import Dialogue from "../chat/Dialogue"
// import TextInput from "../chat/TextInput";

const Violet = ({inventoryItems, handleClose}) => {
  const [showElixirRequestResponse, setShowElixirRequestResponse] = useState(false);
  const [showSeesAndRequestsElixir, setShowSeesAndRequestsElixir] = useState(true);

  const requestElixerHandler = () => {
    setShowElixirRequestResponse(true);
    setShowSeesAndRequestsElixir(false);
    // inventoryItems.includes("striders") ?
    // (Inventory swap elixir)
  }

  return (
    <div id="violet-container" className="flex-column">
      {showSeesAndRequestsElixir && !inventoryItems.includes("elixer") ? (
        <div id="sees-and-requests-elixer">
          <p>*Barf sees the botanical elixir in Violet’s inventory*</p>
          <p>Barf: I have traveled the galaxy to find that. My planet is in desperate need. Plant life has nearly completely died off and needs to be restored.</p>
          <button onClick={requestElixerHandler}>Request Botanical Elixir</button>
        </div>
      ) : (
        showSeesAndRequestsElixir && <p>*Barf and Violet slowly falling in love*</p>
      )}
      {showElixirRequestResponse && (
        <div id="elixer-request-response">
          {inventoryItems.includes("striders") ? (
            <p>Violet Meadows: Sure, here you go cutie. I’m starting to be attracted to you BTW.</p>
          ) : (
            <p>Violet Meadows: EW! How about you put on some pants before approaching a lady like me!?</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Violet;