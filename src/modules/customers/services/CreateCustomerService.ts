import Customer from '../typeorm/entities/Customer';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email já existe');
    }

    const customer = customersRepository.create({ name, email });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
