import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Budget, BudgetResource, LineItem, LineItemResource } from './domain';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {

    private baseUrl = 'http://localhost:8080/api/budget/';

    constructor(private http: HttpClient) { }

    findById(id: string): Observable<Budget> {
        return this.http.get<BudgetResource>(this.apiUrl(id)).pipe(
            map(response => new Budget(response))
        );
    }

    private apiUrl(id: string): string {
        return this.baseUrl + id;
    }

    addLineItem(id: string, lineItem: LineItem): Observable<LineItem> {
        return this.http.post<LineItemResource>(this.apiUrl(id) + '/lineItem', lineItem).pipe(
            map(resource => LineItem.from(resource))
        );
    }
}