import type { Character } from '../typings';

type PermissionKey = keyof Character['permissions'];

export const hasPermission = (
	character: Character,
	permission: PermissionKey | PermissionKey[],
) => {
	if (!Array.isArray(permission)) {
		return character.permissions[permission];
	}

	let failedPerms = 0;

	for (let i = 0; i < permission.length; i++) {
		if (!character.permissions[permission[i]]) failedPerms++;
	}

	return failedPerms !== permission.length;
};
