import { AppDataSource } from '../../database/data-source';
import { User } from '../user/user.entity';
import { Projeto } from './projeto.entity';

export class ProjetoService {
  async list(
    page: number,
    limit: number,
    search?: string,
    sort?: string,
    order: 'asc' | 'desc' = 'asc'
  ) {
    const repo = AppDataSource.getRepository(Projeto);

    const offset = (page - 1) * limit;

    const query = repo
      .createQueryBuilder('projeto')
      .leftJoinAndSelect('projeto.user', 'user');

    if (search) {
      query.andWhere(
        `(
          LOWER(projeto.titulo) LIKE LOWER(:search)
          OR LOWER(projeto.descricao) LIKE LOWER(:search)
        )`,
        { search: `%${search}%` }
      );
    }

    if (sort) {
      query.orderBy(`projeto.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');
    }

    query.skip(offset).take(limit);

    const [projetos, total] = await query.getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      data: projetos,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async create(data: Partial<Projeto>, user: User) {
    const repo = AppDataSource.getRepository(Projeto);
    const projeto = repo.create({ ...data, user });
    return repo.save(projeto);
  }
}
