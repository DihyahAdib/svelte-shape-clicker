//Ui TypeScript file
import { gamestate } from "./gameInstance"

export function updateUi() {
    gamestate.save();
}