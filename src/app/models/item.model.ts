export class Item {
    constructor(
        public item_id: number,
        public list_id: number,
        public item_name: string,
        public is_item_checked: boolean,
    ) {}
}