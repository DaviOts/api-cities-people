import { Icity } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        city: Icity
        people: IPeople
        user: IUser
    }
}