import { Component } from '@angular/core';
import {StockTable} from './StockTable/stock.component';
import {StockService} from './StockTable/stock.service';
@Component({
  selector: 'my-app',
  template: `<h1>My First Angular 2 App - Sri Prabhala</h1>
  <stock-table></stock-table>
  `,
  directives: [StockTable],
  providers: [StockService]
})
export class AppComponent {}