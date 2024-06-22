import { ResponseListType } from '@/models/Proposal';

export default interface CandidateApiType {
  getCandidateResponses(page: number): Promise<ResponseListType>;
  createResponse(vacancyId: number): Promise<void>;
  updateSkills(skillIds: number[]): Promise<void>;
  updateCompetencies(competencies: string): Promise<void>;
}
