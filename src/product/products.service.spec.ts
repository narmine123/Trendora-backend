import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './product.service';
import { HttpService } from '@nestjs/axios';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: HttpService,  // ✅ Mock HttpService
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

