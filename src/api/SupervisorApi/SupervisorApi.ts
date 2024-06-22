import { ProjectListType, ProjectType } from '@/models/Project';
import { ResponseListType } from '@/models/Proposal';
import { VacancyFormType, VacancyListType } from '@/models/Vacancy';
import { axiosInstance } from '../axiosInstance';
import SupervisorApiType from './SupervisorType';

export default class SupervisorApi implements SupervisorApiType {
  async getVacancyResponses(
    vacancyId: number,
    stateId: number,
    page: number,
  ): Promise<ResponseListType> {
    const response = await axiosInstance.get(`/supervisor/vacancy/${vacancyId}/responses`, {
      params: {
        stateId: stateId,
        page: page,
      },
    });
    return response.data;
  }

  async reviewResponse(responseId: number, stateId: number, comment: string) {
    await axiosInstance.patch(`/supervisor/response/${responseId}`, {
      stateId: stateId,
      comment: comment,
    });
  }

  async getSupervisorProjects(page: number): Promise<ProjectListType> {
    const response = await axiosInstance.get('/supervisor/projects', {
      params: {
        page: page,
      },
    });
    return response.data;
  }

  async createVacancy(vacancyData: VacancyFormType): Promise<void> {
    await axiosInstance.post('/supervisor/vacancy/create', vacancyData);
  }

  async updateVacancy(vacancyData: VacancyFormType, vacancyId?: number): Promise<void> {
    await axiosInstance.patch(`/supervisor/vacancy/${vacancyId}/change`, vacancyData);
  }

  async closeVacancy(vacancyId: number): Promise<void> {
    await axiosInstance.patch(`supervisor/close-vacancy/${vacancyId}`);
  }

  async closeProject(projectId: number): Promise<void> {
    await axiosInstance.patch(`supervisor/close-project/${projectId}`);
  }

  async getProjectVacancies(projectId: number, page: number): Promise<VacancyListType> {
    const response = await axiosInstance.get('/supervisor/project/vacancies', {
      params: {
        projectId: projectId,
        page: page,
      },
    });
    return response.data;
  }

  async getActiveProjects(): Promise<ProjectType[]> {
    const response = await axiosInstance.get('/supervisor/active/projects');
    return response.data;
  }
}
