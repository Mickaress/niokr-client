import type { FilterType } from '@/models/Filters';
import type { ProjectType, ProjectListType } from '@/models/Project';

export default interface ProjectApiType {
  getFilteredProjectList(
    filters: FilterType,
    perPage: number,
  ): Promise<ProjectListType>;
  getSingleProject(projectId: number): Promise<ProjectType>;
}
