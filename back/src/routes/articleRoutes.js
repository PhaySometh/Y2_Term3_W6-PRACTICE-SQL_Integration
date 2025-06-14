import { Router } from 'express';
import {
    getAllArticles,
    getArticleById,
    getCategory,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticlesByJournalistId,
    getJournalist,
} from '../controllers/articleController.js';

const articleRouter = Router();
articleRouter.get('/', getAllArticles);
articleRouter.get('/category', getCategory);
articleRouter.get('/journalist', getJournalist);
articleRouter.get('/:id', getArticleById);
articleRouter.post('/', createArticle);
articleRouter.put('/:id', updateArticle);
articleRouter.delete('/:id', deleteArticle);
articleRouter.get('/journalists/:id/articles', getArticlesByJournalistId);

export default articleRouter;
