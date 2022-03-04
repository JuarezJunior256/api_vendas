import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    return await this.findOne({ name });
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return await this.findOne({ id });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({ email });
    return customer;
  }
}

export default CustomersRepository;
