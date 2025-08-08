import { Article, ArticleCreate, ArticleUpdate, ArticleStats } from '@/types/article';

const API_BASE_URL = 'http://localhost:8000/api';

// Generic API function with error handling
const apiRequest = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
    mode: 'cors',
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Handle empty responses (like DELETE operations)
  const contentLength = response.headers.get('Content-Length');
  const contentType = response.headers.get('Content-Type');
  
  // If no content or not JSON, return null
  if (contentLength === '0' || !contentType?.includes('application/json')) {
    return null;
  }

  // Try to parse JSON, handle empty responses
  const text = await response.text();
  if (!text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    console.warn('Failed to parse JSON response:', text);
    return null;
  }
};

export const articleService = {
  // Get all articles
  getArticles: async (): Promise<Article[]> => {
    const response = await apiRequest('/articles/');
    // Django REST framework mengembalikan paginated response dengan struktur: {count, next, previous, results}
    // Kita ambil array dari field 'results'
    return response.results || [];
  },

  // Get a single article by ID
  getArticle: async (id: number): Promise<Article> => {
    return apiRequest(`/articles/${id}/`);
  },

  // Create a new article
  createArticle: async (articleData: ArticleCreate): Promise<Article> => {
    // Check if article has image (File object)
    if (articleData.image && articleData.image instanceof File) {
      return articleService.createArticleWithImage(articleData);
    }
    
    return apiRequest('/articles/', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  },

  // Create article with image upload
  createArticleWithImage: async (articleData: ArticleCreate): Promise<Article> => {
    const formData = new FormData();
    formData.append('title', articleData.title);
    formData.append('content', articleData.content);
    formData.append('author', articleData.author);
    formData.append('is_published', articleData.is_published.toString());
    
    if (articleData.image && articleData.image instanceof File) {
      formData.append('image', articleData.image);
    }

    const response = await fetch(`${API_BASE_URL}/articles/`, {
      method: 'POST',
      body: formData,
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Update an existing article
  updateArticle: async (id: number, articleData: ArticleUpdate): Promise<Article> => {
    // Check if article has image (File object)
    if (articleData.image && articleData.image instanceof File) {
      return articleService.updateArticleWithImage(id, articleData);
    }
    
    return apiRequest(`/articles/${id}/`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
  },

  // Update article with image upload
  updateArticleWithImage: async (id: number, articleData: ArticleUpdate): Promise<Article> => {
    const formData = new FormData();
    formData.append('title', articleData.title);
    formData.append('content', articleData.content);
    formData.append('author', articleData.author);
    formData.append('is_published', articleData.is_published.toString());
    
    if (articleData.image && articleData.image instanceof File) {
      formData.append('image', articleData.image);
    }

    const response = await fetch(`${API_BASE_URL}/articles/${id}/`, {
      method: 'PUT',
      body: formData,
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Delete an article
  deleteArticle: async (id: number): Promise<void> => {
    return apiRequest(`/articles/${id}/`, {
      method: 'DELETE',
    });
  },

  // Get article statistics
  getStats: async (): Promise<ArticleStats> => {
    try {
      const response = await apiRequest('/articles/stats/');
      console.log('Stats response:', response);
      
      // Handle different possible field names from backend
      return {
        total_articles: response.total_articles || response.total || 0,
        published_articles: response.published_articles || response.published || 0,
        draft_articles: response.draft_articles || response.draft || 0
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Return default stats if error
      return {
        total_articles: 0,
        published_articles: 0,
        draft_articles: 0
      };
    }
  },
};
