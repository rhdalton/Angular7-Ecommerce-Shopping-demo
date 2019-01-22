import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any;
  filterProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getProducts().subscribe(p => this.filterProducts = this.products = p);
  }

  filter(query: string) {
    this.filterProducts = (query) ?
      this.products.filter(p => p.data.name.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
