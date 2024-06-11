import Product from '../../../domain/product/entity/product';
import FindCustomerUseCase from '../../customer/find/find.customer.usecase';
import FindProductUseCase from './find.product.usecase';

const product = new Product('123', 'Banana', 23.45);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'Banana',
      price: 23.45,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it('shloud not find a Product', () => {
    const ProductRepository = MockRepository();
    ProductRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });
    const useCase = new FindProductUseCase(ProductRepository);

    const input = {
      id: '123',
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('Product not found');
  });
});
