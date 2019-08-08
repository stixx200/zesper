
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

export class FoodLink {
    id: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class UserQuery {
    id?: string;
    email?: string;
}

export class AuthPayload {
    token: string;
    user: User;
}

export class Food {
    id: string;
    name: string;
    price: number;
}

export class Menu {
    id: string;
    name: string;
    items: Food[];
}

export abstract class IMutation {
    abstract createUser(data: CreateUserInput): AuthPayload | Promise<AuthPayload>;

    abstract login(data: LoginUserInput): AuthPayload | Promise<AuthPayload>;

    abstract deleteUser(): User | Promise<User>;

    abstract createMenu(name: string, foodIds: FoodLink[]): Menu | Promise<Menu>;

    abstract updateMenu(menuId: string, foodIds: FoodLink[], name?: string): Menu | Promise<Menu>;

    abstract deleteMenu(id: string): Menu | Promise<Menu>;

    abstract createFood(name: string, price: number): Food | Promise<Food>;

    abstract updateFood(foodId: string, name?: string, price?: number): Food | Promise<Food>;

    abstract deleteFood(id: string): Food | Promise<Food>;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(query: UserQuery): User | Promise<User>;

    abstract menus(): Menu[] | Promise<Menu[]>;

    abstract foods(): Food[] | Promise<Food[]>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
}
