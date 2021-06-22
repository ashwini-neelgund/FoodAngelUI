import { Address } from "./address";
import { Request } from "./request";

export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    emailAddress!: string;
    gender!: string;
    password!: string;
    phoneNumber!: number;
    altNumber!: number;
    address!: Address[];
    userType!: string;
    requests!: Request[];
}