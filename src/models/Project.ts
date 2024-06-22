import { StateType } from './State';
import type { SpecialistType } from './User';
import type { VacancyType } from './Vacancy';

export type ProjectType = {
  id: number;
  title: string;
  supervisor: Pick<SpecialistType, 'id' | 'fio' | 'email' | 'phone'>;
  conditions: string;
  description: string;
  goal: string;
  period: string;
  state: StateType;
  payment: boolean;
  views: number;
  skills: number[];
  vacancies: Pick<VacancyType, 'id' | 'title' | 'responsibilities' | 'salary' | 'isResponse'>[];
};

export type ProjectListType = {
  projects: ProjectType[];
  quantity: number;
};

export type ProjectFormType = {
  title: string;
  supervisorId?: number;
  dateStart?: string;
  dateEnd?: string;
  description: string;
  goal: string;
  conditions: string;
};
