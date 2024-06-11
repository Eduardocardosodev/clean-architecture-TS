import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import FindProductUseCase from '../find/find.product.usecase';
import Product from '../../../domain/product/entity/product';
import CreateProductUseCase from './create.product.usecase';
import { v4 as uuuid } from 'uuid';

describe('Test create product use case', () => {
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

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const productInput = {
      id: '123',
      name: 'Banana',
      price: 23.45,
    };
    const createdProduct = await useCase.execute(productInput);
    expect(createdProduct).toEqual({
      id: expect.any(String),
      name: 'Banana',
      price: 23.45,
    });
  });
});
