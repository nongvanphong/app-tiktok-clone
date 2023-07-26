import {User} from './InterfaceUser';

export interface Comments {
  id?: number;
  userid?: number;
  videoid?: number;
  messenger?: string;
  createdAt?: string;
  updatedAt?: string;
  User: User;
}
