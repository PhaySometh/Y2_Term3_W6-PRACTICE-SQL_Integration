import { Router } from 'express';
import {
    getAllArticles,
    getArticleWithJournalist,
    getArticleByJournalistId,
    createArticle,
    updateArticle,
    deleteArticle,
} from '../controllers/articleController.js';

const articleRouter = Router();
articleRouter.get('/', getAllArticles);
articleRouter.get('/journalists/:id/articles', getArticleByJournalistId);
articleRouter.get('/:id', getArticleWithJournalist);
articleRouter.post('/', createArticle);
articleRouter.put('/:id', updateArticle);
articleRouter.delete('/:id', deleteArticle);

export default articleRouter;
