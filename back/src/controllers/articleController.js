import * as articleRepository from '../repositories/sqlArticleRepository.js';

// TODO : Change articleRepository to use the sqlArticleRepository

// GET /api/articles
export async function getAllArticles(req, res) {
    try {
        const articles = await articleRepository.getArticles();
        res.json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
// get /api/articles/category
export async function getCategory(req, res) {
    try {
        const category = await articleRepository.getCategory();
        res.json(category);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ message: "Server error" });
    }
}
// get /api/articles/journalist
export async function getJournalist(req, res) {
    try {
        const journalist = await articleRepository.getJournalist();
        res.json(journalist);
    } catch (error) {
        console.error("Error fetching journalist:", error);
        res.status(500).json({ message: "Server error" });
    }
}
// GET /api/articles/:id
export async function getArticleById(req, res) {
    try {
        const article = await articleRepository.getArticleById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
//GET /api/journalists/:id/articles 
export async function getArticlesByJournalistId(req, res) {
    try {
        // const id = req.params.id;
        const article = await articleRepository.getArticlesByJournalistId(req.params.id);
        if (!article) {
        return res.status(404).json({ message: "Journalist not found" });
        }
        res.json(article);
    } catch (err) {
        console.error("Error fetching article:", err);
        res.status(500).json({ message: "Server error" });
    }
}
// POST /api/articles
export async function createArticle(req, res) {
    try {
        const newArticle = await articleRepository.createArticle(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
// PUT /api/articles/:id
export async function updateArticle(req, res) {
    try {
        const updatedArticle = await articleRepository.updateArticle(
            req.params.id,
            req.body
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(updatedArticle);
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
// DELETE /api/articles/:id
export async function deleteArticle(req, res) {
    try {
        await articleRepository.deleteArticle(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
