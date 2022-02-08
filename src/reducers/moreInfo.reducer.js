export default function (moreInfo='', action) {
    if(action.type === 'character') return action.type
    else return moreInfo
}