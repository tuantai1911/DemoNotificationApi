import { groupMembers } from "../database/groupMember.js";

export function GetListParentOfGroup(idGroup) {

    let lstParent = []

    for(var i = 0; i < groupMembers.length; i++) {

        var obj = groupMembers[i];
        if(obj.idGroup == idGroup){
            lstParent.push(obj)
        }
    }
    return lstParent

}