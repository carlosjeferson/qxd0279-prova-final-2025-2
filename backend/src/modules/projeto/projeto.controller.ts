import type { Request, Response } from 'express';
import { ProjetoService } from './projeto.service';

export class ProjetoController {
  async index(req: Request, res: Response) {
    const service = new ProjetoService();

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search as string | undefined;
    const sort = req.query.sort as string | undefined;
    const order = (req.query.order as 'asc' | 'desc') || 'asc';

    const result = await service.list(
      page,
      limit,
      search,
      sort,
      order
    );

    return res.json(result);
  }
}
