export type UserRole = 'specialist' | 'admin';

type SharedUserType = {
  id: number;
  fio: string;
  role: UserRole;
};

export type SpecialistType = SharedUserType & {
  email: string;
  phone: string;
  institute: string;
  skills: number[];
  competencies: string;
  group?: string;
  birthday?: string;
  post?: string;
};

export type AdminType = SharedUserType;
