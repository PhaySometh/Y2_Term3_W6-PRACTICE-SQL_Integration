import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticlesByJournalistId, removeArticle } from '../services/api';

export default function JournalistArticles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [journalistName, setJournalistName] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchJournalist();
    }, [id]);

    const fetchJournalist = async () => {
        setIsLoading(true);
        try {
            const data =  await getArticlesByJournalistId(id);
            if (data.length > 0) {
                setArticles(data);
                setJournalistName(data[0].journalistName || data[0].journalist_name);
            } else {
                setArticles([]);
                setJournalistName('');
                setError('This journalist has no articles.');
            }
        } catch (err) {
            setError('Failed to fetch articles.');
        } finally {
            setIsLoading(false);
        }
    }
    const deleteArticle = async (id) => {
        setIsLoading(true);
        setError("");
        try {
            await removeArticle(id);
            await fetchJournalist();
        } catch (err) {
            setError("Failed to delete article.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleView = (id) => navigate(`/articles/${id}`);
    const handleEdit = (id) => navigate(`/articles/${id}/edit`);

    return (
        <div className='journalist'>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!isLoading && journalistName && <h2>{journalistName}</h2>}
            <div className="article-list">
                {articles.map((article) => (
                    <div key={article.id} className="article-card">
                        <div className="article-title">{article.title}</div>
                        <div className="article-author">
                            By{' '}<Link to={`/journalists/${article.journalistId}`}> {article.journalistName || article.journalist_name}</Link>
                        </div>
                        <div className="article-actions">
                            <button className="button-tertiary" onClick={() => handleEdit(article.id)}>
                                Edit
                            </button>
                            <button className="button-tertiary" onClick={() => deleteArticle(article.id)}>
                                Delete
                            </button>
                            <button className="button-secondary" onClick={() => handleView(article.id)}>
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}