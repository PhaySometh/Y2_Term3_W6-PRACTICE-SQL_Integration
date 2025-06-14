import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  getArticleById, 
  createArticle, 
  updateArticle, 
  getCategory, 
  getJournalist 
} from "../services/api";

export default function ArticleForm({ isEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    journalistId: "",
    categoryId: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [journalists, setJournalists] = useState([]);

  useEffect(() => {
    if (isEdit && id) {
      fetchArticle(id);
    }
    fetchCategories();
    fetchJournalists();
  }, []);

  const fetchArticle = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const article = await getArticleById(id);
      setFormData(article);
    } catch (err) {
      setError("Failed to load article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getCategory();
      console.log("Fetched categories:", data);
      setCategories(data);
    } catch (error) {
      setError("Failed to fetch categories");
      console.error("Fetch categories error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJournalists = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getJournalist();
      console.log("Fetched journalists:", data);
      setJournalists(data);
    } catch (error) {
      setError("Failed to fetch journalists");
      console.error("Fetch journalists error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEdit) {
        await updateArticle(id, formData);
      } else {
        await createArticle(formData);
      }
      navigate("/articles");
    } catch (err) {
      setError("Failed to submit the article.", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="article-form" onSubmit={handleSubmit}>
        <h2>{isEdit ? "Edit Article" : "Create Article"}</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          required
        />
        <br />
        <select
          name="journalistId"
          value={formData.journalistId}
          onChange={handleChange}
          required
        >
          <option value="">Select Journalist</option>
          {journalists.map(j => (
            <option key={j.id} value={j.id}>{j.name}</option>
          ))}
        </select>
        <br />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <br />
        <button className="main" type="submit">
          {isEdit ? "Edit " : "Create"}
        </button>
      </form>
    </>
  );
}
