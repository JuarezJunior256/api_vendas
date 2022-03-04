import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class CreateCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não existe');
    }

    return customer;
  }
}

export default CreateCustomerService;
