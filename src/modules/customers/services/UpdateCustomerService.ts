import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Usuario não encontrado');
    }

    const custormerExists = await customersRepository.findByEmail(email);

    if (custormerExists && email != customer.email) {
      throw new AppError('Já existe email cadastrado');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
