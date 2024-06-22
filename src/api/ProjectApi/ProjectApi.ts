import type { FilterType } from '@/models/Filters';
import type { ProjectListType, ProjectType } from '@/models/Project';
import { axiosInstance } from '../axiosInstance';
import type ProjectApiType from './ProjectApiType';

export default class ProjectApi implements ProjectApiType {
  async getFilteredProjectList(filters: FilterType): Promise<ProjectListType> {
    const response = await axiosInstance.get('projects', {
      params: filters,
    });

    return response.data;
  }
  async getSingleProject(projectId: number): Promise<ProjectType> {
    const response = await axiosInstance.get(`projects/${projectId}`);

    return response.data;
  }
}
