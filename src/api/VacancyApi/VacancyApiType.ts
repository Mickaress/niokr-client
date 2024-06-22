import type { FilterType } from '@/models/Filters';
import type { VacancyType, VacancyListType } from '@/models/Vacancy';

export default interface VacancyApiType {
  getFilteredVacancyList(
    filters: FilterType,
    perPage: number,
  ): Promise<VacancyListType>;
  getSingleVacancy(vacancyId: number): Promise<VacancyType>;
}
