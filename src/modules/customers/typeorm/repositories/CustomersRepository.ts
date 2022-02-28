import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    return this.findOne({ name });
  }

  public async findById(id: string): Promise<Customer | undefined> {
    return this.findOne({ id });
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    return this.findOne({ email });
  }
}

export default CustomersRepository;
