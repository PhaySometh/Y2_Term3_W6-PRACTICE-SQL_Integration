import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getArticles, removeArticle, getCategory } from "../services/api";

//
// ArticleList component
//
export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles(); // Fetch all articles when component mounts
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getArticles();
      setArticles(data);
      console.log('test', data);

    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getCategory();
      setCategories(data);
    } catch (error) {
      setError("Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  }

  const deleteArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      await removeArticle(id);
      await fetchArticles(); // refresh the list
    } catch (err) {
      setError("Failed to delete article.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredArticles = selectedCategoryId
  ? articles.filter(article => article.categoryId == selectedCategoryId)
  : articles;

  const handleView = (id) => navigate(`/articles/${id}`);

  const handleEdit = (id) => navigate(`/articles/${id}/edit`);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="filter">
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          value={articles.categoryId}
          onChange={(e) =>
            setSelectedCategoryId(e.target.value)
          }
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="article-list">
        {filteredArticles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={deleteArticle}
            />
          ))
        )}
      </div>
    </>
  );
}

function ArticleCard({ article, onView, onEdit, onDelete }) {
  return (
    <div className="article-card">
      <div className="article-title">{article.title}</div>
      <div className="article-author">
        By: <Link to={`/journalists/${article.journalistId}`}>{article.journalist_name}</Link>
        <br />
        Category: {article.category_name}
      </div>
      <div className="article-actions">
        <button className="button-tertiary" onClick={() => onEdit(article.id)}>
          Edit
        </button>
        <button
          className="button-tertiary"
          onClick={() => onDelete(article.id)}
        >
          Delete
        </button>
        <button className="button-secondary" onClick={() => onView(article.id)}>
          View
        </button>
      </div>
    </div>
  );
}
