// import {
//     Entity as Collection,
//     Column as Property, ObjectIdColumn,
//     ObjectID,
//     CreateDateColumn as CreateDateProperty,
//     UpdateDateColumn as UpdateDateProperty,
// } from 'typeorm';
import { IRoles, IStatus } from './interfaces';

// @Collection('users')
export class User {
    // @ObjectIdColumn()
    id: string;

    // @Property({ nullable: false })
    name: string;

    // @Property({ nullable: false, unique: true })
    email: string;

    // @Property()
    password: string;

    // @Property()
    role: IRoles;

    // @Property()
    status: IStatus;

    // @CreateDateProperty()
    createdAt: Date;

    // @UpdateDateProperty()
    updatedAt: Date;

    // @Property()
    lastLoggedIn: Date;
}
