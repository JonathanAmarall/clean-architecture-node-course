import { Express, Router } from 'express';
import fg from 'fast-glob';
export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  // importa todo o caminho dos arquivos com os seguintes parametros e adiciona as rotas:
  fg.sync('**/src/main/routes/**routes.ts').map(async (file) => {
    const route = await import(`../../../${file}`);
    route.default(router);
  });
};
