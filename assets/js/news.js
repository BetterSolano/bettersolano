/**
 * News Module - Fetches and renders news from data/news.json
 * Used on both homepage (home-news-grid) and news page (news-grid)
 */
(function () {
  'use strict';

  var NEWS_DATA_URL = (function () {
    var path = window.location.pathname;
    if (path.indexOf('/news') !== -1) {
      return '../data/news.json';
    }
    return 'data/news.json';
  })();

  function formatDate(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function renderHomeNews(articles) {
    var grid = document.getElementById('home-news-grid');
    if (!grid) return;

    var html = '';
    var items = articles.slice(0, 3);
    for (var i = 0; i < items.length; i++) {
      var a = items[i];
      html += '<article class="home-news-card">';
      html += '<div class="home-news-meta">';
      html +=
        '<span class="home-news-badge home-news-badge--' + a.badge + '">' + a.category + '</span>';
      html += '<span class="home-news-date">' + formatDate(a.date) + '</span>';
      html += '</div>';
      html += '<h3><a href="news/">' + a.title + '</a></h3>';
      html += '<p>' + a.summary + '</p>';
      html += '</article>';
    }
    grid.innerHTML = html;
  }

  function renderNewsPage(articles) {
    var grid = document.getElementById('news-grid');
    if (!grid) return;

    var html = '';
    for (var i = 0; i < articles.length; i++) {
      var a = articles[i];
      html += '<article class="news-card" aria-label="' + a.title + '">';
      html += '<div class="news-card-header">';
      html += '<span class="badge badge-' + a.badge + '">' + a.category + '</span>';
      html += '<span class="news-card-date">' + formatDate(a.date) + '</span>';
      html += '</div>';
      html += '<div class="news-card-body">';
      html += '<h3 class="news-card-title">' + a.title + '</h3>';
      html += '<p class="news-card-desc">' + a.summary + '</p>';
      html += '</div>';
      html += '</article>';
    }
    grid.innerHTML = html;
  }

  function loadNews() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', NEWS_DATA_URL, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            var data = JSON.parse(xhr.responseText);
            var articles = data.news || [];
            renderHomeNews(articles);
            renderNewsPage(articles);
          } catch (e) {
            // Silent fail - placeholder content remains
          }
        }
      }
    };
    xhr.send();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNews);
  } else {
    loadNews();
  }
})();
