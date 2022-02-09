export default function (moreInfo='', action) {
    if(action.type) return action.type
    else return moreInfo
}