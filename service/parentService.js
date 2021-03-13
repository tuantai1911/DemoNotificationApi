import parents from '../database/parent.js';
import GetListParentsOfGroup from './groupMemberService.js';

export function GetDeviceToken(parentId) {
    const parentInfo = parents.find((e) => e.parentId === parentId);
    if (parentInfo) {
        return parentInfo.deviceToken;
    }
    return null;
}

export function GetDeviceTokenOfGroup(groupId) {
    const parentsOfGroup = GetListParentsOfGroup(groupId);
    if (parentsOfGroup.length === 0) {
        return [];
    }

    const tokens = [];

    for (let i = 0; i < parentsOfGroup.length; i += 1) {
        const obj = parentsOfGroup[i];
        const parentInfo = parents.find((e) => e.parentId === obj.parentId);
        if (parentInfo) {
            tokens.push(parentInfo.deviceToken);
        }
    }
    return tokens;
}

export function GetDeviceTokenByParentIds(parentIds) {
    const tokens = [];

    for (let i = 0; i < parentIds.length; i += 1) {
        const id = parentIds[i];
        const deviceToken = GetDeviceToken(id);
        if (deviceToken) {
            tokens.push(deviceToken);
        }
    }
    return tokens;
}
