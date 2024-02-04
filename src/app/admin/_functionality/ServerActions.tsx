import Account, { AccountType } from '@/models/Account';
import { toJSON } from '@/utils';

export interface IAccountOverviewDetails {
  primary_email: string;
  user_type: AccountType;
  joined_at: Date;
}

export const getAllUserOverview = async (): Promise<
  Array<IAccountOverviewDetails>
> =>
  toJSON(
    await Account.find()
      .select({ primary_email: 1, user_type: 1, joined_at: 1 })
      .lean()
      .exec()
  );
