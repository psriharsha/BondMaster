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
var stock_1 = require('./stock');
var app_constants_1 = require('../app.constants');
var StockService = (function () {
    function StockService() {
        var _this = this;
        this.proxyName = app_constants_1.SETTINGS.connectionInfo.stockProxy;
        this.findStock = function (stockToFind) { return function (stockToFind) {
            if (stockToFind != undefined) {
                for (var i = 0; i < this.stocks.length; i++) {
                    if (this.stocks[i] === stockToFind)
                        return this.stocks[i];
                }
            }
            else {
                return undefined;
            }
        }; };
        this.stocks = [];
        this.up = '<i class="fa fa-caret-up"></i>';
        this.down = '<i class="fa fa-caret-down"></i>';
        this.connection = $.hubConnection(app_constants_1.SETTINGS.connectionInfo.url);
        this.proxy = this.connection.createHubProxy(this.proxyName);
        this.proxy.on('updateStockPrice', function (stocksR) {
            var i = 0;
            _this.stocks.length = 0;
            for (i = 0; i < stocksR.length; i++) {
                var newStock = new stock_1.Stock();
                newStock.symbol = stocksR[i].Symbol;
                newStock.buy = stocksR[i].buy;
                newStock.sell = stocksR[i].sell;
                newStock.direction = stocksR[i].change;
                newStock.change = (stocksR[i].change === 1) ? true : false;
                _this.stocks.push(newStock);
            }
        });
        this.connection.start().done(function (stocksR) {
            var i = 0;
            for (i = 0; i < stocksR.length; i++) {
                var newStock = new stock_1.Stock();
                newStock.symbol = stocksR[i].Symbol;
                newStock.buy = stocksR[i].buy;
                newStock.sell = stocksR[i].sell;
                newStock.direction = stocksR[i].change;
                newStock.change = (stocksR[i].change === 1) ? true : false;
                _this.stocks.push(newStock);
            }
        }).fail(function (error) {
            console.log('Could not connect ' + error);
        });
    }
    StockService.prototype.getMockData = function () {
        return this.stocks = [
            { symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false },
            { symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false },
            { symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false },
            { symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false },
            { symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false }
        ];
    };
    StockService.prototype.getAllStocks = function () {
        return this.stocks;
    };
    StockService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], StockService);
    return StockService;
}());
exports.StockService = StockService;
//# sourceMappingURL=stock.service.js.map