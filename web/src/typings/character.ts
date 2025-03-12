import type permissions from '../../../permissions.json';

export interface Character {
	stateId: string;
	firstName: string;
	lastName: string;
	title: string;
	grade: number;
	group: string;
	image?: string;
	callSign: string;
	unit?: number;
	permissions: Record<keyof typeof permissions, true>;
}
