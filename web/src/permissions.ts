import permissions from '../../permissions.json';

export default permissions as Record<keyof typeof permissions, number | { [key: string]: number }>;
