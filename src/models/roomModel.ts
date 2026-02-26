import { UserModel } from './userModel';

export interface RoomModel {
  roomNo: string;
  users: UserModel[];
}
