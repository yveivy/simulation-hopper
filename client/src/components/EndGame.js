import React, { useEffect } from "react"
import { retrieveInventoryData} from "../utils/inventory";

const EndGame = () => {

    useEffect(() => {
        const handleKeyDown = async (e) => {
            if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === 'e') {
                return
            }
            if (e.key === ' ' && window.interactionObject === 'Spaceship') {
                try {
                    retrieveInventoryData()
                } catch {
                    console.log("interactionOverlay.js retrieveInventoryData() failed")
                    return
                }
                const endGameItems = ['Botanical Elixir ', 'Aetheric Spanner']
                const hasEndGameItems = endGameItems.every(item => window.globalVars.userInventoryItems.includes(item))
                if (hasEndGameItems) {
                    console.log("endGame.js gameWin!")
                    //! uncomment this function call after moving slideshow functions from gameboard to react: endGame()
                    //! possibly use this function depending on new endgame logic fetchResetInventoryData()
                } else {
                    console.log("interactionMenu.js eventListener: You can't leave in your spaceship yet. You need to get something to restore the plantlife on your home planet and something to repair your ship.")
                    //ToDo: render message on the screen to the effect of "You can't leave in your spaceship yet. You need to get something to restore plantlife on your planet and something to repair your ship."
                    return
                }  
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div>
        </div>
        )
}
export default EndGame