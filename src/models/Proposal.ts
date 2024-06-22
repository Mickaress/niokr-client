import { StateType } from './State';
import { SpecialistType } from './User';
import { VacancyType } from './Vacancy';

export const enum FilterProposalsBy {
  Review = 'review',
  Approved = 'approved',
  Rejected = 'rejected',
}

export type ResponseType = {
  id: number;
  state: StateType;
  candidate: SpecialistType;
  vacancy: VacancyType;
  date: string;
  comment: string;
};

export type ResponseListType = {
  responses: ResponseType[];
  quantity: number;
};

export type SkillOfferType = {
  id: number;
  state: StateType;
  name: string;
};

export type SkillOfferListType = {
  skills: SkillOfferType[];
  quantity: number;
};

export type VacancyOfferListType = {
  vacancies: VacancyType[];
  quantity: number;
};
