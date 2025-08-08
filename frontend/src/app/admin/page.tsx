'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article, ArticleCreate, ArticleUpdate, ArticleStats } from '@/types/article';
import { articleService } from '@/services/api';
import ArticleList from '@/components/ArticleList';
import ArticleForm from '@/components/ArticleForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AdminPage() {
  // State management
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<ArticleStats | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch initial data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Data fetching logic
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching data from API...');
      
      // Fetch articles and stats separately to handle errors independently
      const fetchedArticles = await articleService.getArticles();
      console.log('Fetched articles:', fetchedArticles);
      setArticles(Array.isArray(fetchedArticles) ? fetchedArticles : []);
      
      try {
        const fetchedStats = await articleService.getStats();
        console.log('Fetched stats:', fetchedStats);
        setStats(fetchedStats);
      } catch (statsError) {
        console.error('Error fetching stats:', statsError);
        // Set default stats if stats endpoint fails
        setStats({
          total_articles: 0,
          published_articles: 0,
          draft_articles: 0
        });
      }
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please make sure the backend server is running at http://localhost:8000');
      // Set empty array on error to prevent map errors
      setArticles([]);
      setStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to open the form for creating a new article
  const handleCreate = () => {
    setSelectedArticle(null);
    setIsFormVisible(true);
  };

  // Handler to open the form for editing an existing article
  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setIsFormVisible(true);
  };

  // Handler for saving an article (create or update)
  const handleSave = async (articleData: ArticleCreate | ArticleUpdate) => {
    try {
      if ('id' in articleData) {
        await articleService.updateArticle(articleData.id, articleData);
      } else {
        await articleService.createArticle(articleData);
      }
      await fetchData(); // Refresh data after save
      setIsFormVisible(false);
    } catch (err) {
      setError('Failed to save the article.');
      console.error(err);
    }
  };

  // Handler for deleting an article
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        // Optimistic update: remove article from local state immediately
        const articleToDelete = articles.find(article => article.id === id);
        setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
        
        // Update stats optimistically
        if (stats && articleToDelete) {
          setStats(prevStats => {
            if (!prevStats) return prevStats;
            return {
              total_articles: prevStats.total_articles - 1,
              published_articles: articleToDelete.is_published 
                ? prevStats.published_articles - 1 
                : prevStats.published_articles,
              draft_articles: !articleToDelete.is_published 
                ? prevStats.draft_articles - 1 
                : prevStats.draft_articles,
            };
          });
        }

        // Perform actual delete
        await articleService.deleteArticle(id);
        
        // Refresh data from server to ensure consistency
        await fetchData();
      } catch (err) {
        setError('Failed to delete the article.');
        console.error(err);
        // Revert optimistic update on error
        await fetchData();
      }
    }
  };

  // Main render logic
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Blog Admin Panel
            </h1>
            <nav className="flex space-x-4 mt-2">
              <Link href="/home" className="text-sm text-indigo-600 hover:text-indigo-500">
                View Public Blog
              </Link>
              <Link href="/admin" className="text-sm text-gray-500">
                Admin Panel
              </Link>
            </nav>
          </div>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Article
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Display */}
        {stats && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-sm font-medium text-gray-500">Total Articles</h4>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.total_articles}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-sm font-medium text-gray-500">Published</h4>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.published_articles}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-sm font-medium text-gray-500">Drafts</h4>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.draft_articles}</p>
            </div>
          </div>
        )}

        {/* Conditional Rendering: Form or Article List */}
        {isFormVisible ? (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <ArticleForm
              article={selectedArticle}
              onSave={handleSave}
              onCancel={() => setIsFormVisible(false)}
            />
          </div>
        ) : (
          <>
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!isLoading && !error && (
              <ArticleList articles={articles} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
