import { Component, signal } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { LineItem } from './domain';
import { BudgetService } from './service';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
    selector: 'budget',
    imports: [
        MatTableModule,
        CurrencyPipe,
        MatButtonModule,
        MatIconModule,
        FormsModule, 
        MatFormFieldModule, 
        MatInputModule,
        ReactiveFormsModule
    ],
    templateUrl: './budget.html',
    styleUrl: './budget.css'
})
export class BudgetComponent {

    protected readonly title = signal('bucket-frontend');
    private id: string = '0a22b2e4-ce9f-4341-8580-b65e80b1a92d';
    addForm: FormGroup;

    displayedColumns: string[] = ['name', 'amount', 'actions'];
    dataSource = new MatTableDataSource<LineItem>();

    constructor(private service: BudgetService) {
        this.addForm = new FormGroup({
            name: new FormControl('', Validators.required),
            amount: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
        this.loadLineItems();
    }

    private loadLineItems() {
        this.service.findById(this.id).subscribe(response => {
            this.dataSource.data = response.lineItems;
        });
    }

    addLineItem() {
        
        const { name, amount } = this.addForm.value;
        const lineItem = LineItem.of(name, amount * 100);

        this.service.addLineItem(this.id, lineItem).subscribe(
            _ => this.loadLineItems()
        );
    }

    removeLineItem(lineItem: LineItem) {
        this.service.removeLineItem(this.id, lineItem).subscribe(
            _ => this.loadLineItems()
        );
    }
}