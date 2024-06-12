import { response } from 'express';
import { app, sequelize } from '../express';
import request from 'supertest';
describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Banana',
      price: 23.45,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Banana');

    expect(response.body.price).toBe(23.45);
  });

  it('should not create product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Banana',
    });
    expect(response.status).toBe(500);
  });

  it('should list all product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Banana',
      price: 23.45,
    });

    expect(response.status).toBe(200);

    const response2 = await request(app).post('/product').send({
      name: 'Maca',
      price: 23.45,
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/product').send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe('Banana');
    expect(product.price).toBe(23.45);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe('Maca');
    expect(product.price).toBe(23.45);
  });
});
