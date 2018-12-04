import { DataSource } from "@angular/cdk/table";
import { Customer } from "../customer";
import { BehaviorSubject, Observable } from "rxjs";
import { CustomerService } from "../customer.service";
import { CollectionViewer } from "@angular/cdk/collections";
import { finalize } from "rxjs/operators";

export class CustomersDataSource implements DataSource<Customer> {

    private customersSubject = new BehaviorSubject<Customer[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    totalElements: string;

    constructor(private customerService: CustomerService) {}

    connect(collectionViewer: CollectionViewer): Observable<Customer[]> {
        return this.customersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.customersSubject.complete();
        this.loadingSubject.complete();
    }

    loadCustomers(filter='',  pageIndex = 0, pageSize = 2): void {

        this.loadingSubject.next(true);

        this.customerService.findCustomers(
            filter, pageIndex, pageSize).pipe(
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(customers => {
            this.customersSubject.next(customers)
            }
        );
    }
}