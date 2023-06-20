import React, {useEffect, useState} from "react"
import "../../../css/overlay1.css"
import "../../../css/special-features.css"
// import Dialogue from "../chat/Dialogue"
// import TextInput from "../chat/TextInput";
import { useQuery, useMutation, gql } from "@apollo/client"

const Violet = ({inventoryItems, handleClose}) => {
  const [showElixirRequestResponse, setShowElixirRequestResponse] = useState(false);
  const [showSeesAndRequestsElixir, setShowSeesAndRequestsElixir] = useState(true);
  const [barfHasPants, setHasPants] = useState(false);
  const [violetHasElixir, setHasElixir] = useState(false)
  const [awaitingInventoryCheck, setAwaitingInventoryCheck] = useState(false);
  const [awaitingTransfer, setAwaitingTransfer] = useState(false);
  // const [hasMetViolet, setHasMetViolet ] = useState(false)
  console.log("violetboxopen")
  const playerToken = localStorage.getItem('nekotsresueht')
  const PANTS_CHECK = gql`query Query($token: String) {
  userSaveFile(token: $token) {
    inventory {
      barf {
        striders
      }
      violet {
        elixir
      }
    }
  }
  }`;
  const { loading: inventoryLoading, data: inventoryCheck } = useQuery(PANTS_CHECK, {
    variables: {
      token: playerToken,
    },
    fetchPolicy: 'no-cache'
  });

  const WIN_ELIXIR = gql`mutation Mutation($token: String!, $characterName: String!, $item: String!) {
  winItem(token: $token, characterName: $characterName, item: $item)
}`
  const [winElixirMutation, { loading: transferLoading, error: transferError }] = useMutation(WIN_ELIXIR, {
    variables: {
      token: playerToken,
      characterName: "violet",
      item: "elixir"
    },
  });
  if (transferError) {
  console.log("Error occurred during the elixir transfer:", transferError);
}

  useEffect(() => {
    if (inventoryLoading) {
      setAwaitingInventoryCheck(true)
    }
    if(!inventoryLoading && inventoryCheck) {
      setHasPants(inventoryCheck.userSaveFile.inventory.barf.striders)
      setHasElixir(inventoryCheck.userSaveFile.inventory.violet.elixir)
      console.log("pantscheckdata     ", inventoryCheck.userSaveFile.inventory.barf.striders);
      console.log("elixircheckdata    ", inventoryCheck.userSaveFile.inventory.violet.elixir)
      const timer = setTimeout(() => {
      setAwaitingInventoryCheck(false)
      }, 2000);
      return () => clearTimeout(timer)
    }
  }, [inventoryLoading, inventoryCheck])

    useEffect(() => {
    if (transferLoading) {
      setAwaitingTransfer(true)
    }
    if(!transferLoading) {
      const timer = setTimeout(() => {
      setAwaitingTransfer(false)
      }, 3000);
      return () => clearTimeout(timer)
    }
  }, [transferLoading])

  const requestElixerHandler = () => {
    setShowElixirRequestResponse(true);
    setShowSeesAndRequestsElixir(false);
    localStorage.setItem('hasMetViolet', true)
    if (barfHasPants && violetHasElixir) {
      winElixirMutation()
      localStorage.setItem('elixir', true)
    }
  }
  const hasMetViolet = localStorage.getItem('hasMetViolet')
  return (
    <div id="violet-container" className="flex-column" style={{height:"100%", margin: "0px"}}>
      {awaitingInventoryCheck && !hasMetViolet ? (
        <div>
          <p>Violet: Hey you! You don't look like you are from around here! Did you hear that loud boom earlier?</p>
        </div>
      ) : (
        <>
          {!violetHasElixir && hasMetViolet ? (
            <div style={{margin: "60px"}}>
              <p>Godspeed Barf, my short king! Use the elixir to save your home planet!</p>
            </div>
          ) : showSeesAndRequestsElixir && violetHasElixir && !barfHasPants ? (
            <div style={{margin: "60px"}} id="sees-and-requests-elixer">
              <p>*Barf sees the botanical elixir in Violet’s inventory*<br/><br/> 
              Barf: I have traveled the galaxy to find that. My planet is in desperate need. Plant life has nearly completely died off and needs to be restored.</p>
              <button id="violet-btn" onClick={requestElixerHandler}>Request Botanical Elixir</button>
            </div>
          ) : (
            <div style={{margin: "60px"}}>
              {barfHasPants && showSeesAndRequestsElixir && (
                <>
                  <p>*Barf and Violet slowly falling in love*</p>
                  <button onClick={requestElixerHandler}>Request Botanical Elixir</button>
                </>
              )}
            </div>
          )}

          {showElixirRequestResponse && (
            <div style={{margin: "60px"}} id="elixer-request-response">
              {!barfHasPants ? (
                <p>Violet Meadows: EW! How about you put on some pants before approaching a lady like me!?</p>
              ) : barfHasPants && awaitingTransfer ? (
                <p>Violet Meadows: Those pants are hot! Is that kangaroo leather? I need a moment...</p>
              ) : (
                <p>Violet Meadows: Here it is, the Botanical Elixir! I hope this is what you need to get your planet back in tip-top shape! Godspeed to you Barf, my short king!<br/><br/>
                <i>Barf received the Botanical Elixir!</i></p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Violet;