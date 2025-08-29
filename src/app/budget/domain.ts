export interface BudgetResource {
        id: string;
        lineItems: LineItemResource[];
}

export interface LineItemResource {

        id: string;
        name: string;
        amount: number;
}

export class Budget {
        
        id: string;
        lineItems: LineItem[];

        constructor(resource: BudgetResource) {
                this.id = resource.id;
                this.lineItems = LineItem.fromAll(resource.lineItems);
        }
}

export class LineItem {

        id: string;
        name: string;
        amount: number;

        constructor(id: string, name: string, amount: number) {
                this.id = id;
                this.name = name;
                this.amount = amount;
        }

        public static of(name: string, amount: number): LineItem {
            return new LineItem('', name, amount);
        }

        public static from(resource: LineItemResource): LineItem {
            return new LineItem(resource.id, resource.name, resource.amount);
        }

        public static fromAll(resources: LineItemResource[]): LineItem[] {
                return resources.map(resource => LineItem.from(resource));
        }

        public dollars(): number {
                return this.amount / 100.0;
        }
}