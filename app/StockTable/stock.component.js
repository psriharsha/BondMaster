"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var stock_service_1 = require('./stock.service');
var StockTable = (function () {
    function StockTable(stockService) {
        this.stockService = stockService;
        this.title = "My Stock Table";
        this.stocks = stockService.stocks;
    }
    StockTable.prototype.refreshData = function () {
        this.stocks = this.stockService.getMockData();
    };
    StockTable = __decorate([
        core_1.Component({
            selector: 'stock-table',
            template: "{{title}}\n    <table id=\"stockTable\" class=\"table table-responsive table-striped table-hover\">\n        <tr *ngFor=\"let stock of stocks\" [class.success]=\"stock.direction==1\" [class.danger]=\"stock.direction!=1\">\n            <td>{{stock.symbol}}</td>\n            <td>\n                <i class=\"fa fa-arrow-up\" aria-hidden=\"true\" *ngIf=\"stock.change\"></i>\n                <i class=\"fa fa-arrow-down\" aria-hidden=\"true\" *ngIf=\"!stock.change\"></i>\n            </td> \n            <td>{{stock.buy}}</td>\n            <td>{{stock.sell}}</td>\n        </tr>\n    </table>\n    <button (click)=\"refreshData()\">Refresh</button>\n    "
        }), 
        __metadata('design:paramtypes', [stock_service_1.StockService])
    ], StockTable);
    return StockTable;
}());
exports.StockTable = StockTable;
//# sourceMappingURL=stock.component.js.map