import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';
import Product from '../../../domain/product/entity/product';

describe('Test update product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const createProduct = new Product('123', 'Banana', 30.0);
    const useCase = new UpdateProductUseCase(productRepository);

    await productRepository.create(createProduct);

    const updatedProductInput = {
      id: '123',
      name: 'Apple',
      price: 30.0,
    };

    const updatedProduct = await useCase.execute(updatedProductInput);

    expect(updatedProduct).toEqual(updatedProductInput);
  });
});
