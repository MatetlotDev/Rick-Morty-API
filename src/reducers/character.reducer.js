export default function (character={}, action) {
    if(action.type === 'updateCharacter') return action.character
    else return character
}