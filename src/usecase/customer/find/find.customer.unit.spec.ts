import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

const costumer = new Customer('123', 'John');
const address = new Address('Street', 123, 'zip', 'city');
costumer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(costumer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'John',
      address: {
        street: 'Street',
        city: 'city',
        number: 123,
        zip: 'zip',
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it('shloud not find a customer', () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow('Customer not found');
  });
});
