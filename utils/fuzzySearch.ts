import { User } from '../store/types';

export const fuzzySearch = (query: string, users: User[]) => {
  const normalizedQuery = query.toLowerCase();
  return users.filter((user) => user.name.toLowerCase().includes(normalizedQuery));
};
