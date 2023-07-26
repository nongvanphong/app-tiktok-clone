import {User} from './InterfaceUser';

export interface InterfaceVideo {
  id?: number;
  userid?: number;
  videotag?: string;
  videotitle?: string;
  videodescrible?: string;
  videouri?: string;
  status?: number;
  createdAt?: string;
  updatedAt?: string;
  pause?: boolean;
  User?: User;
  uri?: string;
  like_number?: number;
  cmt_number?: number;
}
