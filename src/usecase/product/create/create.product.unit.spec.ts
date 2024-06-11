import CreateProductUseCase from './create.product.usecase';

const input = {
  type: 'a',
  name: 'Banana',
  price: 23.45,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it('should thrown an error when type is missing', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.type = '';

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Product type not supported'
    );
  });

  it('should thrown an error when name is missing', async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = '';

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      'Product type not supported'
    );
  });
});