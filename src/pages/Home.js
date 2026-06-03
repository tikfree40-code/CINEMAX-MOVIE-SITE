import React from 'react';
import HeroSlider, { HeroSkeleton } from '../components/HeroSlider';
import MediaRow from '../components/MediaRow';
import { useApp } from '../context/AppContext';
import {
  getTrending,
  getPopularMovies,
  getPopularSeries,
  getTopRatedMovies,
  getNowPlaying,
} from '../utils/api';
import useFetch from '../hooks/useFetch';

export default function Home() {
  const { language } = useApp();

  const { data: trending, loading: trendingLoading } = useFetch(
    () => getTrending('all', 'week', language), [language]
  );
  const { data: popularMovies, loading: pmLoading } = useFetch(
    () => getPopularMovies(1, language), [language]
  );
  const { data: popularSeries, loading: psLoading } = useFetch(
    () => getPopularSeries(1, language), [language]
  );
  const { data: topRated, loading: trLoading } = useFetch(
    () => getTopRatedMovies(1, language), [language]
  );
  const { data: nowPlaying, loading: npLoading } = useFetch(
    () => getNowPlaying(1, language), [language]
  );

  const trendingItems = trending?.results || [];
  const heroItems = trendingItems.filter((i) => i.backdrop_path).slice(0, 6);

  return (
    <div>
      {trendingLoading ? (
        <HeroSkeleton />
      ) : (
        <HeroSlider items={heroItems} />
      )}

      <div style={{ padding: '48px 0 0' }}>
        <div className="container">
          <MediaRow
            title="Trending"
            accent="🔥"
            items={trendingItems}
            loading={trendingLoading}
            seeAllLink="/movies"
          />
          <MediaRow
            title="Now Playing"
            items={nowPlaying?.results || []}
            loading={npLoading}
            seeAllLink="/movies"
          />
          <MediaRow
            title="Popular Movies"
            items={popularMovies?.results || []}
            loading={pmLoading}
            seeAllLink="/movies"
          />
          <MediaRow
            title="Popular Series"
            items={(popularSeries?.results || []).map((i) => ({ ...i, media_type: 'tv' }))}
            loading={psLoading}
            seeAllLink="/series"
          />
          <MediaRow
            title="Top Rated"
            items={topRated?.results || []}
            loading={trLoading}
            seeAllLink="/movies"
          />
        </div>
      </div>
    </div>
  );
}
