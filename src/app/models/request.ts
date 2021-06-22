import { Item } from "./item";

export class Request {
    id!: number;
    pin!: number;
    status!: string;
    itemsRequested!: Item[];
}