import type { SkillType } from '@/models/Filters';

export default interface SkillApiType {
  getAllSkills(): Promise<SkillType[]>;
}
