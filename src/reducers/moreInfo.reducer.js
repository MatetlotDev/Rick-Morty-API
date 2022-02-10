export default function (moreInfo = '', action) {
    if (action.type === 'selectChar') return action.char
    else if (action.type === 'selectEpi') return action.epi
    else if (action.type === 'selectLoc') return action.loc
    else return moreInfo
}