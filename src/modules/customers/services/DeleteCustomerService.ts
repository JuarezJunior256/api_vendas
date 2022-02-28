import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = new CustomersRepository();

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Cliente não existe');
    }

    await customersRepository.delete(id);
  }
}

export default DeleteCustomerService;
