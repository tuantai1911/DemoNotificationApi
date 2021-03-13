import groupMembers from '../database/groupMember.js';

export default function GetListParentOfGroup(groupId) {
    const parents = [];

    for (let i = 0; i < groupMembers.length; i += 1) {
        const obj = groupMembers[i];
        if (obj.groupId === groupId) {
            parents.push(obj);
        }
    }
    return parents;
}
