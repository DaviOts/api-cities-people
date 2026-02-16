import { Icity, IPerson, IUser } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        city: Icity
        people: IPerson
        users: IUser
    }
}