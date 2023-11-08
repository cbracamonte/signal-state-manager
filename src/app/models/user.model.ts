export interface User {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export enum UserProperties {
  userId = 'userId',
  id = 'id',
  title = 'title',
  completed = 'completed',
}