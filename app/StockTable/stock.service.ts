import { Injectable, EventEmitter } from '@angular/core';
import {Stock} from './stock';
import {SETTINGS} from '../app.constants';
declare var $ : any

@Injectable()
export class StockService{
    stocks : Stock[];
    up: String;
    down: String;
    private proxy: any;
    private proxyName: string = SETTINGS.connectionInfo.stockProxy;
    private connection;
    
    public findStock = (stockToFind: String) => function(stockToFind){
        if(stockToFind != undefined){
            for(var i = 0; i< this.stocks.length; i++){
                if(this.stocks[i] === stockToFind)
                    return this.stocks[i];
            }
        }else{
            return undefined;
        }
    }
    constructor(){
        this.stocks= [];
        this.up = '<i class="fa fa-caret-up"></i>';
        this.down = '<i class="fa fa-caret-down"></i>';
        
        this.connection = $.hubConnection(SETTINGS.connectionInfo.url);
        this.proxy = this.connection.createHubProxy(this.proxyName);
        this.proxy.on('updateStockPrice', (stocksR) => {
            var i = 0;
            this.stocks.length = 0;
            for(i=0; i<stocksR.length; i++){
                var newStock = new Stock();
                newStock.symbol = stocksR[i].Symbol;
                newStock.buy = stocksR[i].buy;
                newStock.sell = stocksR[i].sell;
                newStock.direction = stocksR[i].change;
                newStock.change = (stocksR[i].change === 1)?true:false;
                this.stocks.push(newStock);
            }
        });
        this.connection.start().done((stocksR) => {
            var i = 0;
            for(i=0; i<stocksR.length; i++){
                var newStock = new Stock();
                newStock.symbol = stocksR[i].Symbol;
                newStock.buy = stocksR[i].buy;
                newStock.sell = stocksR[i].sell;
                newStock.direction = stocksR[i].change;
                newStock.change = (stocksR[i].change === 1)?true:false;
                this.stocks.push(newStock);
            }
        }).fail((error) => {
            console.log('Could not connect ' + error);
            
        });
    }
    getMockData(){
       return this.stocks= [
            {symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false},
            {symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false},
            {symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false},
            {symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false},
            {symbol: "EURGBP", buy: 123.123, sell: 321.321, direction: 1, change: false}
        ];
    }
    getAllStocks(){
        return this.stocks;
    }
}