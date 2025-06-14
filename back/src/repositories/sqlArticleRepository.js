import pool from '../utils/database.js';

// Get all articles
export async function getArticles() {
    // TODO
    try {
        const [rows] = await pool.query(`
            SELECT a.*,
                j.name AS journalist_name,
                c.name AS category_name
            FROM articles a
            JOIN journalist j ON a.journalistId = j.id
            JOIN category c ON a.categoryId = c.id;
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
        const [data] = await pool.query (
            `select a.*, 
                j.name as journalistName,
                c.name as categoryName
            from articles a
            join journalist j on a.journalistId = j.id 
            join category c on a.categoryId = c.id
            where a.id = ?`, [id]
        );
        return data[0];
    } catch (err) {
        console.log("Error get article by id", err);
    }
}
//get category
export async function getCategory() {
    try {
        const [data] = await pool.query (
            `select * from category;`
        )
        return data;
    } catch (err) {
        console.log('Error fetch category', err)
    }
}
export async function getJournalist() {
    try {
        const [data] = await pool.query (
            `select * from journalist;`
        )
        return data;
    } catch (err) {
        console.log('Error fetch journalist', err)
    }
}
export async function getArticlesByJournalistId(id) {
    try {
        const [data] = await pool.query (
            `select a.*, j.name as journalistName
            from articles a
            join journalist j on a.journalistId = j.id
            where j.id = ?`, [id]
        )
        return data;
    } catch (err) {
        console.log('Error get article by journalist id', err);
    }
}
// Create a new article
export async function createArticle(article) {
    // TODO
    const { title, content, journalistId, categoryId } = article;
    try {
        const [result] = await pool.query(
            `INSERT INTO articles (
                title,
                content, 
                journalistId, 
                categoryId
            ) VALUES (?, ?, ?, ?)`,
            [title, content, journalistId, categoryId]
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
    try {
        const [data] = await pool.query(
            `update articles set
                title = ?,
                content = ?,
                journalistId = ?,
                categoryId = ? 
            where id = ?`,
            [updatedData.title, updatedData.content, updatedData.journalistId, updatedData.categoryId, id]
        );
        return data;
    } catch (err) {
        console.log("Error update article", err);
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