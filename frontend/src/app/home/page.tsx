'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/article';
import { articleService } from '@/services/api';
import LoadingSpinner from '@/components/LoadingSpinner';

// Component untuk menampilkan artikel individual di halaman publik
function PublicArticleCard({ article }: { article: Article }) {
  const router = useRouter();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleReadMore = () => {
    router.push(`/home/${article.id}`);
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.image && (
        <div className="h-48 bg-gray-200 overflow-hidden cursor-pointer" onClick={handleReadMore}>
          <Image
            src={article.image} 
            alt={article.title}
            width={300}
            height={200}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>By {article.author}</span>
          <span>{formatDate(article.created_at)}</span>
        </div>
        <h2 
          className="text-xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors cursor-pointer"
          onClick={handleReadMore}
        >
          {article.title}
        </h2>
        <p className="text-gray-700 line-clamp-3 leading-relaxed">
          {article.content}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Published
          </span>
          <button 
            onClick={handleReadMore}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium flex items-center transition-colors"
          >
            Read More 
            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPublishedArticles();
  }, []);

  const fetchPublishedArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedArticles = await articleService.getArticles();
      // Filter only published articles
      const publishedArticles = fetchedArticles.filter(article => article.is_published);
      setArticles(publishedArticles);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                My Blog
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Welcome to our blog! Here you&apos;ll find our latest articles and insights.
              </p>
            </div>
            <nav className="flex space-x-4">
              <Link href="/home" className="text-sm text-gray-500">
                Home
              </Link>
              <Link href="/admin" className="text-sm text-indigo-600 hover:text-indigo-500">
                Admin Panel
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!isLoading && !error && articles.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No articles published yet</h3>
              <p className="mt-1 text-sm text-gray-500">Check back later for new content!</p>
            </div>
          </div>
        )}

        {!isLoading && !error && articles.length > 0 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
              <p className="mt-2 text-gray-600">Discover our most recent posts</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <PublicArticleCard key={article.id} article={article} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2025 My Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
