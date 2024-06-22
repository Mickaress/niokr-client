import { ProjectFormType } from '@/models/Project';
import { SkillOfferListType, VacancyOfferListType } from '@/models/Proposal';
import { SpecialistType } from '@/models/User';
import { axiosInstance } from '../axiosInstance';
import AdminApiType from './AdminApiType';

export default class AdminApi implements AdminApiType {
  async createProject(projectData: ProjectFormType): Promise<void> {
    await axiosInstance.post('/admin/project', projectData);
  }
  async getSkillOffers(page: number): Promise<SkillOfferListType> {
    const response = await axiosInstance.get('/admin/skills', {
      params: {
        page: page,
      },
    });
    return response.data;
  }

  async reviewSkill(skillId: number, stateId: number): Promise<void> {
    await axiosInstance.patch(`/admin/skill/${skillId}`, {
      stateId: stateId,
    });
  }

  async getVacancyOffers(page: number): Promise<VacancyOfferListType> {
    const response = await axiosInstance.get(`/admin/vacancies`, {
      params: {
        page: page,
      },
    });

    return response.data;
  }

  async reviewVacancy(vacancyId: number, stateId: number, comment: string): Promise<void> {
    await axiosInstance.patch(`/admin/vacancy/${vacancyId}`, {
      stateId: stateId,
      comment: comment,
    });
  }

  async getSupervisorList(): Promise<SpecialistType[]> {
    const response = await axiosInstance.get('/admin/supervisors');

    return response.data;
  }
}
