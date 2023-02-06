import { Listing } from "./listing";

export class User {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    passwordConfirm: string;
    city: string;
    birthday: Date;
    phone: string;
    email: string;
    agency: string;
    licence: number;
    type: String;
    pending: Number;
    favouriteListings: Array<Listing>;
}