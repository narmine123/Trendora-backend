

// import { Injectable, NotFoundException } from '@nestjs/common';

// @Injectable()
// export class CustomersService {
//   private readonly apiUrl = 'https://fakestoreapi.com/products';
//   private customers = []; // In-memory store for customers
//   private idCounter = 1;  // Counter for generating unique IDs

//   // Get all customers
//   findAll() {
//     return this.customers;
//   }

//   // Get a single customer by ID
//   findOne(id: number) {
//     const customer = this.customers.find((c) => c.id === id);
//     if (!customer) {
//       throw new NotFoundException(`Customer with ID ${id} not found.`);
//     }
//     return customer;
//   }

//   // Add a new customer
//   create(customerDto: any) {
//     const newCustomer = { id: this.idCounter++, ...customerDto };
//     this.customers.push(newCustomer);
//     return newCustomer;
//   }

//   // Update an existing customer
//   update(id: number, customerDto: any) {
//     const index = this.customers.findIndex((c) => c.id === id);
//     if (index === -1) {
//       throw new NotFoundException(`Customer with ID ${id} not found.`);
//     }
//     this.customers[index] = { ...this.customers[index], ...customerDto };
//     return this.customers[index];
//   }

//   // Delete a customer
//   remove(id: number) {
//     const index = this.customers.findIndex((c) => c.id === id);
//     if (index === -1) {
//       throw new NotFoundException(`Customer with ID ${id} not found.`);
//     }
//     return this.customers.splice(index, 1);
//   }
// }
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';  
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  constructor(private readonly httpService: HttpService) {}

  // Get all products
  async getAllProducts(): Promise<Product[]> {
    const response = await lastValueFrom(this.httpService.get(this.apiUrl));
    return response.data;
  }

  // Get a single product by ID
  async getProductById(id: number): Promise<Product> {
    const response = await lastValueFrom(
      this.httpService.get(`${this.apiUrl}/${id}`),
    );
    return response.data;
  }

  // Add a new product
  async addProduct(product: Product): Promise<Product> {
    const response = await lastValueFrom(
      this.httpService.post(this.apiUrl, product),
    );
    return response.data;
  }

  // Update an existing product
  async updateProduct(id: number, product: Product): Promise<Product> {
    const response = await lastValueFrom(
      this.httpService.put(`${this.apiUrl}/${id}`, product),
    );
    return response.data;
  }
}
