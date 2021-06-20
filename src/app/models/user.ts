import { Address } from "./address";

export class User {
    userId!: number;
    firstName!: string;
    lastName!: string;
    emailAddress!: string;
    gender!: string;
    password!: string;
    phoneNumber!: number;
    altNumber!: number;
    address!: Address[];
    userType!: string;
}