import type { SkillType } from '@/models/Filters';
import { axiosInstance } from '../axiosInstance';
import SkillApiType from './SkillApiType';

export default class SkillApi implements SkillApiType {
  async getAllSkills(): Promise<SkillType[]> {
    const response = await axiosInstance.get('skills');
    return response.data;
  }
}
