export default function (element = {}, action) {
    if (action.type === 'updateCharacter') return action.character
    else if (action.type === 'updateEpisode') return action.episode
    else if (action.type === 'updateLocation') return action.location
    else return element
}