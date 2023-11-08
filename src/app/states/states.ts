import { SourceOfTruthInitiate } from 'halo-state-manager';
import { User, UserProperties } from '../models/user.model';

export enum StoreKeys {
  'USER' = 'USER',
}

export const sourceOfTruthInitiate: SourceOfTruthInitiate[] = [
    {
        key: StoreKeys.USER,
        state: {
            userId: 0,
            id: 0,
            title: '',
            completed: false
        },
        stateProperties: UserProperties
    }
];

