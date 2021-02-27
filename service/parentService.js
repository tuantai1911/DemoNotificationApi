import { parents } from '../database/parent.js'
import { GetListParentOfGroup } from "./groupMemberService.js";

export function GetDeviceToken(idParent) {
    for (var i = 0; i < parents.length; i++) {
        var obj = parents[i];
        if (obj.idParent == idParent) {
            return obj.deviceToken
        }
    }
    return null

}

export function GetDeviceTokenOfGroup(idGroup) {

    let lstParent = GetListParentOfGroup(idGroup)
    if (lstParent.length == 0) {
        return null
    }
    else {
        let lstToken = []

        for (var i = 0; i < lstParent.length; i++) {
            var obj = lstParent[i];
            let parentInfo = parents.find(e => e.idParent === obj.idParent)
            if (parentInfo) {
                lstToken.push(parentInfo.deviceToken)
            }
        }
        return lstToken
    }

}

export function GetDeviceTokenByLstParent(idParents) {

    let lstToken = []

    for (var i = 0; i < idParents.length; i++) {
        var id = idParents[i];
        let parentInfo = parents.find(e => e.idParent === id)
        if (parentInfo) {
            lstToken.push(parentInfo.deviceToken)
        }
    }
    return lstToken

}