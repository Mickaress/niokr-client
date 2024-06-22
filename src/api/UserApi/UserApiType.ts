import { AdminType, SpecialistType } from '@/models/User';

export default interface UserApiType {
  auth(): Promise<void>;
  logout(): Promise<void>;
  getUserInfo(): Promise<SpecialistType | AdminType | null>;
}
