

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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async addProduct(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.productRepository.findOne({ where: { id } });
  }
}

