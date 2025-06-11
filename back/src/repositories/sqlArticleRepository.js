//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

import pool from '../utils/database.js';

// Get all articles
export async function getArticles() {
    // TODO
    try {
        const [rows] = await pool.query(`
            SELECT a.*, j.name AS journalist_name
            FROM articles a
            JOIN journalist j ON a.journalistId = j.id
        `);
        console.log('Fetched articles with journalist name:', rows);
        return rows;
    } catch (err) {
        console.error('Error fetching articles with journalist:', err.message);
        throw err;
    }
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    try {
        const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [
            id,
        ]);
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
    const { title, content, journalistId, category } = article;
    try {
        const [result] = await pool.query(
            'INSERT INTO articles (title, content, journalistId, category) VALUES (?, ?, ?, ?)',
            [title, content, journalistId, category]
        );
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
    const { title, content, journalistId, category } = updatedData;
    try {
        const [result] = await pool.query(
            'UPDATE articles SET title = ?, content = ?, journalistId = ?, category = ? WHERE id = ?',
            [title, content, journalistId, category, id]
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
        const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [
            id,
        ]);
        return result.affectedRows > 0;
    } catch (err) {
        console.error('Error deleting article:', err.message);
        throw err;
    }
}

// Fetch articles with joined journalist name (using SQL JOIN)
export async function getArticleWithJournalist(id) {
    try {
        const [rows] = await pool.query(` 
                SELECT a.*, j.name AS journalist_name 
                FROM articles a
                JOIN journalist j ON a.journalistId = j.id
                WHERE a.id = ?
                `, [id]);
        console.log('Fetched articles with journalist ID:', id, rows);
        return rows;
    } catch (err) {
        console.error('Error fetching articles with journalist:', err.message);
        throw err;
    }
}

// Fetch all articles written by a specific journalist name (using SQL JOIN)
export async function getArticleByJournalistId(journalistId) {
    try {
        const [rows] = await pool.query(
            ` 
                SELECT a.*, j.name AS journalist_name 
                FROM articles a
                JOIN journalist j ON a.journalistId = j.id
                WHERE j.id = ?
                `,
            [journalistId]
        );
        console.log('Fetched articles with journalist:', rows);
        return rows;
    } catch (err) {
        console.error('Error fetching articles with journalist:', err.message);
        throw err;
    }
}
