"""
Test file for the Blog API

This file contains sample API requests that can be used to test the blog functionality.
You can run these tests after starting the Django server.
"""

import requests
import json

# Base URL for the API
BASE_URL = "http://127.0.0.1:8000/api"

def test_create_article():
    """Test creating a new article"""
    article_data = {
        "title": "My First Blog Post",
        "content": "This is the content of my first blog post. It's quite interesting and informative.",
        "author": "John Doe"
    }
    
    response = requests.post(f"{BASE_URL}/articles/", json=article_data)
    print(f"Create Article - Status: {response.status_code}")
    if response.status_code == 201:
        print(f"Created article: {response.json()}")
    else:
        print(f"Error: {response.text}")
    return response.json() if response.status_code == 201 else None

def test_list_articles():
    """Test getting all articles"""
    response = requests.get(f"{BASE_URL}/articles/")
    print(f"List Articles - Status: {response.status_code}")
    if response.status_code == 200:
        articles = response.json()
        print(f"Found {len(articles.get('results', []))} articles")
    else:
        print(f"Error: {response.text}")
    return response.json() if response.status_code == 200 else None

def test_get_article(article_id):
    """Test getting a specific article"""
    response = requests.get(f"{BASE_URL}/articles/{article_id}/")
    print(f"Get Article {article_id} - Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Article: {response.json()}")
    else:
        print(f"Error: {response.text}")
    return response.json() if response.status_code == 200 else None

def test_update_article(article_id):
    """Test updating an article"""
    update_data = {
        "title": "Updated Blog Post Title",
        "content": "This is the updated content of the blog post with more details and information.",
        "author": "John Doe"
    }
    
    response = requests.put(f"{BASE_URL}/articles/{article_id}/", json=update_data)
    print(f"Update Article {article_id} - Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Updated article: {response.json()}")
    else:
        print(f"Error: {response.text}")
    return response.json() if response.status_code == 200 else None

def test_delete_article(article_id):
    """Test deleting an article"""
    response = requests.delete(f"{BASE_URL}/articles/{article_id}/")
    print(f"Delete Article {article_id} - Status: {response.status_code}")
    if response.status_code == 204:
        print("Article deleted successfully")
    else:
        print(f"Error: {response.text}")

def test_article_stats():
    """Test getting article statistics"""
    response = requests.get(f"{BASE_URL}/articles/stats/")
    print(f"Article Stats - Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Stats: {response.json()}")
    else:
        print(f"Error: {response.text}")

if __name__ == "__main__":
    print("Testing Blog API...")
    print("Make sure the Django server is running on http://127.0.0.1:8000")
    print("-" * 50)
    
    # Test creating an article
    article = test_create_article()
    
    if article:
        article_id = article['id']
        
        # Test listing articles
        test_list_articles()
        
        # Test getting a specific article
        test_get_article(article_id)
        
        # Test updating the article
        test_update_article(article_id)
        
        # Test getting stats
        test_article_stats()
        
        # Test deleting the article
        test_delete_article(article_id)
