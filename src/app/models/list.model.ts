import { Item } from "./item.model";

export class List {
    constructor(
        public list_id: number,
        public list_name: string,
        public date_leaving: string,
        public items: Item[]
    ) {}
}