import { ProjectType } from './Project';
import { StateType } from './State';

export type VacancyType = {
  id: number;
  title: string;
  salary: number;
  responsibilities: string;
  conditions: string;
  requirements: string;
  dateStart: string;
  dateEnd: string;
  period: string;
  skills: number[];
  project: Omit<ProjectType, 'conditions' | 'vacancies'>;
  state: StateType;
  comment: string;
  isResponse: boolean;
};

export type VacancyListType = {
  vacancies: VacancyType[];
  quantity: number;
};

export type VacancyFormType = {
  title: string;
  salary: string;
  dateStart: string | undefined;
  dateEnd: string | undefined;
  requirements: string;
  responsibilities: string;
  conditions: string;
  skillIds: number[];
  projectId: number;
};
