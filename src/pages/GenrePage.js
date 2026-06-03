import React from 'react';
import { useParams } from 'react-router-dom';
import MediaCard, { MediaCardSkeleton } from '../components/MediaCard';
import { useApp } from '../context/AppContext';
import { getMoviesByGenre } from '../utils/api';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import './BrowsePage.css';

const GENRE_LABELS = {
  action: { emoji: '💥', color: '#e8462a' },
  drama: { emoji: '🎭', color: '#63b3ed' },
  comedy: { emoji: '😄', color: '#f6e05e' },
  horror: { emoji: '👻', color: '#9f7aea' },
  romance: { emoji: '💕', color: '#fc8181' },
  'sci-fi': { emoji: '🚀', color: '#68d391' },
};

export default function GenrePage() {
  const { id, name } = useParams();
  const { language } = useApp();
  const genreInfo = GENRE_LABELS[name] || { emoji: '🎬', color: 'var(--accent-primary)' };

  const { items, loading, lastItemRef } = useInfiniteScroll(
    (page, lang) => getMoviesByGenre(id, page, lang),
    language
  );

  return (
    <div className="browse-page container">
      <div className="browse-page__header">
        <h1 className="browse-page__title" style={{ color: genreInfo.color }}>
          {genreInfo.emoji} {name.charAt(0).toUpperCase() + name.slice(1)}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: -12, marginBottom: 8 }}>
          Browse all {name} movies
        </p>
      </div>

      <div className="grid-cards">
        {items.map((item, i) => (
          <div key={`${item.id}-${i}`} ref={i === items.length - 1 ? lastItemRef : null}>
            <MediaCard item={item} index={i % 20} />
          </div>
        ))}
        {loading && Array.from({ length: 12 }).map((_, i) => <MediaCardSkeleton key={`sk-${i}`} />)}
      </div>

      {!loading && items.length === 0 && (
        <div className="error-state"><p>No results found.</p></div>
      )}
    </div>
  );
}
