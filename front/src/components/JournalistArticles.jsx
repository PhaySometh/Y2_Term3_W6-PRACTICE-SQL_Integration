import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticlesByJournalist } from '../services/api';

export default function JournalistArticles() {
    const { journalistId } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getArticlesByJournalist(journalistId);
                setArticles(result);
                setError('');
            } catch {
                setError("Failed to load journalist's articles.");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [journalistId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    const journalistName = articles.length > 0 ? articles[0].journalist_name : '';

    return (
        <div>
            <h2>Articles by {journalistName || 'Journalist'}</h2>
            {articles.length === 0 ? (
                <p>No articles found.</p>
            ) : (
                <div className="article-list">
                    {articles.map((article) => (
                        <div key={article.id} className="article-card">
                            <div className="article-title">{article.title}</div>
                            <div className="article-author">By {article.journalist_name}</div>
                            <button
                                className="button-secondary"
                                onClick={() => navigate(`/articles/${article.id}`)}
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
