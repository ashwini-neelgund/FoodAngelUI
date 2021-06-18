import { Address } from "./address";

export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    userName!: string;
    emailAddress!: string;
    gender!: string;
    password!: string;
    phoneNumber!: number;
    altNumber!: number;
    address!: Address;
    idFile!: File;
}