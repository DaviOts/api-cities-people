import { Icity, IPerson } from '../../models';

declare module 'knex/types/tables' {
    interface Tables {
        city: Icity
        people: IPerson
    }
}