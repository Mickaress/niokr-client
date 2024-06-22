export const enum StateID {
  Active = 1,
  Approved = 2,
  Review = 3,
  Rejected = 4,
  Archived = 5,
}

export type StateType = {
  id: StateID;
  state: string;
};

export const StateClass: Record<StateID, string> = {
  [StateID.Active]: 'active',
  [StateID.Archived]: 'archived',
  [StateID.Review]: 'review',
  [StateID.Approved]: 'approved',
  [StateID.Rejected]: 'rejected',
};
