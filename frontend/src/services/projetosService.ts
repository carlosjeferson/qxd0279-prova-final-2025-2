import { api } from "./api";

class ProjetosService {
  async getAll(page = 1, limit = 5) {
    return api.get('/api/projetos', {
      params: {
        page,
        limit
      }
    });
  }
}

export const useProjetosService = () => new ProjetosService();
