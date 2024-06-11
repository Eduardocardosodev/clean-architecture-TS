import ProductFactory from '../../../domain/product/factory/product.factory';
import ListProductUseCase from './list.product.usecase';

const product1 = ProductFactory.create('a', 'Banana', 23.45);

const product2 = ProductFactory.create('b', 'Banana 2', 23.45);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe('Unit Test for listing product use case', () => {
  it('should list a product', async () => {
    const repository = MockRepository();
    const usecase = new ListProductUseCase(repository);

    const output = await usecase.execute({});

    expect(output.Producers.length).toBe(2);
    expect(output.Producers[0].id).toBe(product1.id);

    expect(output.Producers[0].name).toBe(product1.name);

    expect(output.Producers[0].price).toBe(product1.price);

    expect(output.Producers[1].id).toBe(product2.id);
    expect(output.Producers[1].name).toBe(product2.name);
    expect(output.Producers[1].price).toBe(product2.price);
  });
});
