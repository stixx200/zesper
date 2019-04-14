
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class AuthPayload {
    token: string;
    user: User;
}

export abstract class IMutation {
    abstract createUser(data: CreateUserInput): AuthPayload | Promise<AuthPayload>;

    abstract login(data: LoginUserInput): AuthPayload | Promise<AuthPayload>;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: string;
    email: string;
}
