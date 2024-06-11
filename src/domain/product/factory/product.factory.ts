import Product from '../entity/product';
import ProductInterface from '../entity/product.interface';
import { v4 as uuid } from 'uuid';

export default class ProductFactory {
  public static create(name: string, price: number): ProductInterface {
    return new Product(uuid() || null, name, price);
  }
}
