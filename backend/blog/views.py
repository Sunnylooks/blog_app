from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Article
from .serializers import ArticleSerializer


class ArticleListCreateView(generics.ListCreateAPIView):
    queryset = Article.objects.all().order_by('-created_at')
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = Article.objects.all().order_by('-created_at')
        author = self.request.query_params.get('author')
        if author is not None:
            queryset = queryset.filter(author__icontains=author)
        return queryset


class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_object(self):
        return get_object_or_404(Article, pk=self.kwargs['pk'])


@api_view(['GET'])
def article_stats(request):
    """Get basic statistics about articles"""
    total_articles = Article.objects.count()
    published_articles = Article.objects.filter(is_published=True).count()
    draft_articles = Article.objects.filter(is_published=False).count()
    
    return Response({
        'total': total_articles,
        'published': published_articles,
        'drafts': draft_articles
    })
