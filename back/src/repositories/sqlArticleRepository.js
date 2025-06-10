//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

import pool from "../utils/database.js";

// Get all articles
export async function getArticles() {
    // TODO
    try {
        const [rows] = await pool.query('SELECT * FROM articles');
        console.log('Fetched articles:', rows);
        return rows;
    } catch (err) {
        console.error('Error fetching articles:', err.message);
        throw err;
    }
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    try {
        const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [id])
        console.log('Fetched article by ID:', id, rows);
        return rows[0];
    } catch (err) {
        console.error('Error fetching article by ID:', err.message);
        throw err;
    }
}

// Create a new article
export async function createArticle(article) {
    // TODO
    const { title, content, journalist, category } = article;
    try {
        const [result] = await pool.query(
            'INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)',
            [title, content, journalist, category]
        )
        console.log('Inserted new article:', result);
        return result.insertId;
    } catch (err) {
        console.error('Error creating article:', err.message);
        throw err;
    }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const { title, content, journalist, category } = updatedData;
    try {
        const [result] = await pool.query(
            'UPDATE articles SET title = ?, content = ?, journalist = ?, category = ? WHERE id = ?',
            [title, content, journalist, category, id]
        );
        console.log('Updated article:', id, result);
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Error updating article:', err.message);
        throw err;
    }
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    try {
        const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Error deleting article:', err.message);
        throw err;
    }
}
