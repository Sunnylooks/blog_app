#!/usr/bin/env python3
"""
Startup script for the Django Blog API project.

This script helps you set up the database and create initial data.
"""

import os
import sys
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_project.settings')
django.setup()

from blog.models import Article

def create_sample_articles():
    """Create some sample articles for testing"""
    
    sample_articles = [
        {
            "title": "Getting Started with Django REST Framework",
            "content": "Django REST Framework is a powerful toolkit for building Web APIs. It provides a lot of built-in functionality that makes it easy to create robust APIs quickly. In this article, we'll explore the basics of setting up a REST API with Django.",
            "author": "Django Developer"
        },
        {
            "title": "Building a Blog API",
            "content": "Creating a blog API is a great way to learn about REST principles and Django development. This tutorial will guide you through creating a complete blog API with CRUD operations for articles, including proper validation and error handling.",
            "author": "API Expert"
        },
        {
            "title": "Best Practices for API Development",
            "content": "When developing APIs, it's important to follow best practices to ensure your API is secure, scalable, and maintainable. This includes proper error handling, input validation, authentication, and clear documentation.",
            "author": "Tech Lead"
        }
    ]
    
    created_count = 0
    for article_data in sample_articles:
        article, created = Article.objects.get_or_create(
            title=article_data['title'],
            defaults=article_data
        )
        if created:
            created_count += 1
            print(f"Created article: {article.title}")
        else:
            print(f"Article already exists: {article.title}")
    
    print(f"\nCreated {created_count} new sample articles.")
    return created_count

def main():
    """Main setup function"""
    print("Setting up Django Blog API...")
    print("-" * 40)
    
    # Create sample articles
    try:
        created_count = create_sample_articles()
        
        print(f"\nSetup complete!")
        print(f"Total articles in database: {Article.objects.count()}")
        
        print("\nYou can now:")
        print("1. Run the development server: python manage.py runserver")
        print("2. Access the API at: http://127.0.0.1:8000/api/articles/")
        print("3. Access the admin interface at: http://127.0.0.1:8000/admin/")
        print("   (You'll need to create a superuser first: python manage.py createsuperuser)")
        
    except Exception as e:
        print(f"Error during setup: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
