import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'; 
import { CurrencyconverterService } from './currencyconverter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CurrencyconverterService]
})
export class AppComponent implements OnInit{
  title = 'currency-converter-demo';
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  amount: number = 1;
  convertedAmount: number = 0;

  exchangeRates: any;

  constructor(private currencyConverterService : CurrencyconverterService){}

  ngOnInit(): void {
    this.loadExchangeRates();
  }

  loadExchangeRates(): void{
    this.currencyConverterService.getExchangeRates().subscribe(
      (data) => {
        this.exchangeRates = data;
        // call the function which will convert the currency
        this.convertCurrency()
      },
      (error) => { console.log("Error fetching api : ", error); }
    );
  }

  convertCurrency(): void {
    const rate = this.exchangeRates.conversion_rates[this.toCurrency];
    this.convertedAmount = this.amount * rate;
  }
}
