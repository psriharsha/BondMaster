import {Component} from '@angular/core';
import {Stock} from './stock';
import {StockService} from './stock.service';

@Component({
    selector: 'stock-table',
    template: `{{title}}
    <table id="stockTable" class="table table-responsive table-striped table-hover">
        <tr *ngFor="let stock of stocks" [class.success]="stock.direction==1" [class.danger]="stock.direction!=1">
            <td>{{stock.symbol}}</td>
            <td>
                <i class="fa fa-arrow-up" aria-hidden="true" *ngIf="stock.change"></i>
                <i class="fa fa-arrow-down" aria-hidden="true" *ngIf="!stock.change"></i>
            </td> 
            <td>{{stock.buy}}</td>
            <td>{{stock.sell}}</td>
        </tr>
    </table>
    <button (click)="refreshData()">Refresh</button>
    `
})
export class StockTable{
    title: string;
    stocks: Stock[];
    constructor(public stockService: StockService){
        this.title = "My Stock Table";
        this.stocks = stockService.stocks;
    }
    refreshData(){
        this.stocks = this.stockService.getMockData();
    }
}