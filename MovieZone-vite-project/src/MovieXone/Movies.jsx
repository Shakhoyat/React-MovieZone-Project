import React from 'react'
import { useState, useMemo } from 'react'
import { movies } from './data'

const Movies = () => {
    const [movieList] = useState(movies)
    const [filterCategory, setFilterCategory] = useState('All')
    const [sortBy, setSortBy] = useState('rating')
    const [searchTerm, setSearchTerm] = useState('')

    // Get unique categories for filter
    const categories = useMemo(() => {
        const cats = [...new Set(movies.map(movie => movie.category))]
        return ['All', ...cats.sort()]
    }, [])

    // Filter and sort movies
    const filteredAndSortedMovies = useMemo(() => {
        let filtered = movieList.filter(movie => {
            const matchesCategory = filterCategory === 'All' || movie.category === filterCategory
            const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesCategory && matchesSearch
        })

        return filtered.sort((a, b) => {
            if (sortBy === 'rating') return b.imdb_rating - a.imdb_rating
            if (sortBy === 'title') return a.title.localeCompare(b.title)
            if (sortBy === 'date') return new Date(b.release_date) - new Date(a.release_date)
            return 0
        })
    }, [movieList, filterCategory, sortBy, searchTerm])

    const getRatingColor = (rating) => {
        if (rating >= 8.0) return 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
        if (rating >= 7.0) return 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)'
        if (rating >= 6.0) return 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)'
        return 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            padding: '40px 20px'
        }}>
            {/* Header Section */}
            <div style={{
                textAlign: 'center',
                marginBottom: '50px',
                color: 'white'
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '900',
                    margin: '0 0 10px 0',
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    letterSpacing: '-1px'
                }}>🎬 Movie Collection</h1>
                <p style={{
                    fontSize: '1.2rem',
                    margin: '0',
                    opacity: '0.9',
                    fontWeight: '300'
                }}>Discover amazing movies from 2024 & 2025</p>
            </div>

            {/* Controls Section */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto 40px auto',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {/* Search Bar */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '12px 20px 12px 45px',
                            borderRadius: '25px',
                            border: 'none',
                            fontSize: '16px',
                            width: '280px',
                            background: 'rgba(255,255,255,0.95)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            outline: 'none'
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '18px',
                        color: '#666'
                    }}>🔍</span>
                </div>

                {/* Category Filter */}
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{
                        padding: '12px 20px',
                        borderRadius: '25px',
                        border: 'none',
                        fontSize: '16px',
                        background: 'rgba(255,255,255,0.95)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category === 'All' ? '📂 All Categories' : `🎭 ${category}`}
                        </option>
                    ))}
                </select>

                {/* Sort Options */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                        padding: '12px 20px',
                        borderRadius: '25px',
                        border: 'none',
                        fontSize: '16px',
                        background: 'rgba(255,255,255,0.95)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <option value="rating">⭐ Sort by Rating</option>
                    <option value="title">🔤 Sort by Title</option>
                    <option value="date">📅 Sort by Date</option>
                </select>
            </div>

            {/* Results Counter */}
            <div style={{
                textAlign: 'center',
                marginBottom: '30px',
                color: 'white',
                fontSize: '1.1rem',
                opacity: '0.9'
            }}>
                Showing {filteredAndSortedMovies.length} movie{filteredAndSortedMovies.length !== 1 ? 's' : ''}
            </div>

            {/* Movies Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '35px',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                {filteredAndSortedMovies.map((movie) => (
                    <div
                        key={movie.id}
                        style={{
                            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                            borderRadius: '20px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                            overflow: 'hidden',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.8)'
                        }}
                        onMouseOver={e => {
                            e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.25)';
                        }}
                        onMouseOut={e => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                        }}
                    >
                        {/* Movie Poster */}
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <img
                                src={movie.poster_path}
                                alt={movie.title}
                                style={{
                                    width: '100%',
                                    height: '450px',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease'
                                }}
                                onMouseOver={e => {
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseOut={e => {
                                    e.target.style.transform = 'scale(1)';
                                }}
                            />

                            {/* Rating Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: getRatingColor(movie.imdb_rating),
                                color: 'white',
                                padding: '8px 12px',
                                borderRadius: '20px',
                                fontWeight: '700',
                                fontSize: '14px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                ⭐ {movie.imdb_rating}
                            </div>

                            {/* Category Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                background: 'rgba(0,0,0,0.8)',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '15px',
                                fontSize: '12px',
                                fontWeight: '600',
                                backdropFilter: 'blur(10px)'
                            }}>
                                {movie.category}
                            </div>
                        </div>

                        {/* Movie Details */}
                        <div style={{
                            padding: '25px',
                            background: 'white'
                        }}>
                            <h2 style={{
                                margin: '0 0 15px 0',
                                fontSize: '1.4rem',
                                color: '#1a202c',
                                fontWeight: '800',
                                lineHeight: '1.3',
                                letterSpacing: '-0.5px'
                            }}>{movie.title}</h2>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '12px',
                                fontSize: '14px',
                                color: '#4a5568'
                            }}>
                                <span style={{
                                    marginRight: '8px',
                                    fontSize: '16px'
                                }}>📅</span>
                                <span style={{ fontWeight: '600' }}>Released:</span>
                                <span style={{ marginLeft: '8px' }}>{formatDate(movie.release_date)}</span>
                            </div>

                            {movie.overview && (
                                <div style={{
                                    marginTop: '15px',
                                    padding: '15px',
                                    background: '#f7fafc',
                                    borderRadius: '12px',
                                    borderLeft: '4px solid #667eea'
                                }}>
                                    <p style={{
                                        margin: '0',
                                        fontSize: '13px',
                                        color: '#4a5568',
                                        lineHeight: '1.5'
                                    }}>
                                        {movie.overview.length > 120
                                            ? `${movie.overview.substring(0, 120)}...`
                                            : movie.overview}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Hover Overlay */}
                        <div style={{
                            position: 'absolute',
                            inset: '0',
                            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
                            opacity: '0',
                            transition: 'opacity 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '600',
                            pointerEvents: 'none'
                        }}
                            onMouseOver={e => {
                                e.currentTarget.style.opacity = '1';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.opacity = '0';
                            }}>
                            🎬 View Details
                        </div>
                    </div>
                ))}
            </div>

            {/* No Results Message */}
            {filteredAndSortedMovies.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '1.2rem',
                    marginTop: '50px',
                    padding: '40px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '20px',
                    maxWidth: '500px',
                    margin: '50px auto 0'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
                    <p>No movies found matching your criteria.</p>
                    <p style={{ fontSize: '1rem', opacity: '0.8' }}>
                        Try adjusting your search or filter options.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Movies