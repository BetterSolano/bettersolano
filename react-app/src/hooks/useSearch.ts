'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import servicesData from '@/data/services.json';

interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryId?: string;
  keywords: string[];
  office?: string;
  fee?: string;
  processingTime?: string;
  url: string;
}

interface SearchResult extends Service {
  score: number;
  _query: string;
}

interface SearchSuggestions {
  popular: string[];
  recent: string[];
  suggestions: string[];
}

const RECENT_SEARCHES_KEY = 'bettersolano_recent_searches';
const MAX_RECENT_SEARCHES = 10;

const CURATED_POPULAR = [
  'birth certificate', 'business permit', 'cedula', 'real property tax',
  'senior citizen id', 'pwd id', 'barangay clearance', 'building permit',
  'marriage certificate', 'death certificate', 'tricycle franchise',
  'property declaration', 'online payment', 'mswdo', 'slaughterhouse'
];

// Tokenize text into searchable words
function tokenize(text: string): string[] {
  if (!text) return [];
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 2);
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Check if terms are similar (fuzzy match)
function isFuzzyMatch(term: string, target: string, threshold = 0.3): boolean {
  if (target.includes(term) || term.includes(target)) return true;
  if (target.startsWith(term) || term.startsWith(target)) return true;
  
  const distance = levenshteinDistance(term, target);
  const maxLen = Math.max(term.length, target.length);
  const similarity = 1 - (distance / maxLen);
  
  return similarity >= (1 - threshold);
}

// Calculate search score
function calculateScore(service: Service, searchTerms: string[], originalQuery: string): number {
  let score = 0;
  const titleLower = service.title.toLowerCase();
  const categoryLower = service.category.toLowerCase();
  const descLower = (service.description || '').toLowerCase();
  const officeLower = (service.office || '').toLowerCase();
  const processingTime = (service.processingTime || '').toLowerCase();
  const keywords = service.keywords || [];
  const queryLower = originalQuery.toLowerCase();

  // Exact full query match in title (highest priority)
  if (titleLower === queryLower) score += 200;
  else if (titleLower.includes(queryLower)) score += 100;

  searchTerms.forEach(term => {
    // Title scoring
    if (titleLower === term) score += 80;
    else if (titleLower.startsWith(term)) score += 60;
    else if (titleLower.includes(term)) score += 40;
    else if (isFuzzyMatch(term, titleLower, 0.25)) score += 20;

    // Keyword scoring
    keywords.forEach(keyword => {
      const kw = keyword.toLowerCase();
      if (kw === term) score += 35;
      else if (kw.includes(term)) score += 20;
      else if (isFuzzyMatch(term, kw, 0.3)) score += 10;
    });

    // Category scoring
    if (categoryLower.includes(term)) score += 15;
    else if (isFuzzyMatch(term, categoryLower, 0.3)) score += 8;

    // Description scoring
    if (descLower.includes(term)) score += 10;

    // Office scoring
    if (officeLower.includes(term)) score += 12;
    else if (isFuzzyMatch(term, officeLower, 0.3)) score += 6;

    // Processing time scoring
    if (processingTime.includes(term)) score += 8;
  });

  // Boost for services with more complete data
  if (service.fee) score += 2;
  if (service.processingTime) score += 2;
  if (service.description) score += 1;

  return score;
}

// Get recent searches from localStorage
function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Add to recent searches
function addRecentSearch(query: string): void {
  if (typeof window === 'undefined' || !query || query.length < 2) return;
  
  try {
    let recent = getRecentSearches();
    recent = recent.filter(q => q.toLowerCase() !== query.toLowerCase());
    recent.unshift(query);
    recent = recent.slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
  } catch {
    // localStorage not available
  }
}

// Clear recent searches
function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // localStorage not available
  }
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestions>({
    popular: [],
    recent: [],
    suggestions: []
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const services = useMemo(() => servicesData.services as Service[], []);

  // Search function
  const search = useCallback((searchQuery: string, category?: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      return [];
    }

    const searchTerms = tokenize(searchQuery);
    if (searchTerms.length === 0) {
      setResults([]);
      return [];
    }

    const searchResults: SearchResult[] = [];

    services.forEach(service => {
      // Category filter
      if (category && service.categoryId !== category && 
          !service.category.toLowerCase().includes(category.toLowerCase())) {
        return;
      }

      const score = calculateScore(service, searchTerms, searchQuery);
      if (score > 0) {
        searchResults.push({ ...service, score, _query: searchQuery });
      }
    });

    const sorted = searchResults
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setResults(sorted);
    return sorted;
  }, [services]);

  // Get suggestions
  const getSuggestions = useCallback((searchQuery: string): SearchSuggestions => {
    if (!searchQuery || searchQuery.length < 1) {
      return {
        popular: CURATED_POPULAR.slice(0, 4),
        recent: getRecentSearches().slice(0, 3),
        suggestions: []
      };
    }

    const queryLower = searchQuery.toLowerCase();
    const suggestionSet = new Set<string>();

    // Add matching service titles
    services.forEach(service => {
      if (service.title.toLowerCase().includes(queryLower)) {
        suggestionSet.add(service.title);
      }
    });

    // Add fuzzy matches from popular searches
    CURATED_POPULAR.forEach(term => {
      if (term.includes(queryLower) || isFuzzyMatch(queryLower, term, 0.4)) {
        suggestionSet.add(term);
      }
    });

    return {
      popular: [],
      recent: [],
      suggestions: Array.from(suggestionSet).slice(0, 8)
    };
  }, [services]);

  // Update suggestions when query changes
  useEffect(() => {
    const newSuggestions = getSuggestions(query);
    setSuggestions(newSuggestions);
  }, [query, getSuggestions]);

  // Handle query change
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(-1);
    
    if (newQuery.length >= 2) {
      search(newQuery);
    } else {
      setResults([]);
    }
  }, [search]);

  // Handle search submit
  const handleSubmit = useCallback((searchQuery?: string) => {
    const q = searchQuery || query;
    if (q.length >= 2) {
      addRecentSearch(q);
      search(q);
    }
  }, [query, search]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
    search(suggestion);
    addRecentSearch(suggestion);
  }, [search]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const totalItems = results.length + suggestions.suggestions.length + 
                       suggestions.recent.length + suggestions.popular.length;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, totalItems - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        e.preventDefault();
        // Handle selection based on index
        if (results.length > 0 && selectedIndex < results.length) {
          addRecentSearch(query);
          window.location.href = results[selectedIndex].url;
        }
      } else if (results.length > 0) {
        e.preventDefault();
        addRecentSearch(query);
        window.location.href = results[0].url;
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [results, suggestions, selectedIndex, query]);

  return {
    query,
    setQuery: handleQueryChange,
    results,
    suggestions,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    search,
    handleSubmit,
    handleSuggestionClick,
    handleKeyDown,
    clearRecentSearches,
    addRecentSearch
  };
}

// Highlight matching text
export function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const terms = tokenize(query);
  let result = text;
  terms.forEach(term => {
    if (term.length >= 2) {
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      result = result.replace(regex, '<mark>$1</mark>');
    }
  });
  return result;
}
