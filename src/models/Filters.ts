export type PaymentType = 'true' | 'false';

export type FilterType = {
  title: string;
  payment: PaymentType[];
  skills: number[];
  page: number;
};

export type SkillType = {
  id: number;
  name: string;
};
