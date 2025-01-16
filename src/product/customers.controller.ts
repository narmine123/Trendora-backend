// import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
// import { CustomersService } from './customers.service';

// @Controller('customers')
// export class CustomersController {
//   constructor(private readonly customersService: CustomersService) {}

//   // Get all customers
//   @Get()
//   findAll() {
//     return this.customersService.findAll();
//   }

//   // Get a single customer by ID
//   @Get(':id')
//   findOne(@Param('id') id: number) {
//     return this.customersService.findOne(Number(id));
//   }

//   // Add a new customer
//   @Post()
//   create(@Body() customerDto: any) {
//     return this.customersService.create(customerDto);
//   }

//   // Update an existing customer
//   @Put(':id')
//   update(@Param('id') id: number, @Body() customerDto: any) {
//     return this.customersService.update(Number(id), customerDto);
//   }

//   // Delete a customer
//   @Delete(':id')
//   remove(@Param('id') id: number) {
//     return this.customersService.remove(Number(id));
//   }
// }
import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getAllCustomers() {
    return this.customersService.getAllCustomers();
  }

  @Get(':id')
  async getCustomer(@Param('id') id: number) {
    return this.customersService.getCustomerById(id);
  }

  @Post()
  async addCustomer(@Body() customer: any) {
    return this.customersService.addCustomer(customer);
  }

  @Put(':id')
  async updateCustomer(@Param('id') id: number, @Body() customer: any) {
    return this.customersService.updateCustomer(id, customer);
  }
}
