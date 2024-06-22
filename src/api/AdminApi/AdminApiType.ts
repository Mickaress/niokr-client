import { ProjectFormType } from '@/models/Project';
import { SkillOfferListType, VacancyOfferListType } from '@/models/Proposal';
import { SpecialistType } from '@/models/User';

export default interface AdminApiType {
  getSkillOffers(page: number): Promise<SkillOfferListType>;
  reviewSkill(skillId: number, stateId: number): Promise<void>;
  getVacancyOffers(page: number): Promise<VacancyOfferListType>;
  reviewVacancy(vacancyId: number, stateId: number, comment: string): Promise<void>;
  getSupervisorList(): Promise<SpecialistType[]>;
  createProject(projectData: ProjectFormType): Promise<void>;
}
