import React from 'react'
import { useState, useMemo } from 'react'
import { movies } from './data'

const Movies = () => {
    const [movieList] = useState(movies)
    const [filterCategory, setFilterCategory] = useState('All')
    const [sortBy, setSortBy] = useState('rating')
    const [searchTerm, setSearchTerm] = useState('')
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

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
        if (rating >= 8.0) return 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        if (rating >= 7.0) return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        if (rating >= 6.0) return 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
        return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
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
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            minHeight: '100vh',
            padding: '0'
        }}>
            {/* Enhanced Header with Navigation */}
            <header style={{
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
                padding: '20px 0',
                position: 'sticky',
                top: '0',
                zIndex: '100',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
            }}>
                <div style={{
                    maxWidth: '1600px',
                    margin: '0 auto',
                    padding: '0 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: '900',
                            margin: '0',
                            background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            letterSpacing: '-1px'
                        }}>🎬 CineVault</h1>
                        <p style={{
                            fontSize: '1rem',
                            margin: '5px 0 0 0',
                            color: '#94a3b8',
                            fontWeight: '400'
                        }}>Premium Movie Collection</p>
                    </div>

                    {/* View Mode Toggle */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(30, 41, 59, 0.8)',
                        borderRadius: '12px',
                        padding: '4px',
                        border: '1px solid rgba(148, 163, 184, 0.2)'
                    }}>
                        <button
                            onClick={() => setViewMode('grid')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                background: viewMode === 'grid' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'transparent',
                                color: viewMode === 'grid' ? 'white' : '#94a3b8',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            ⊞ Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                border: 'none',
                                background: viewMode === 'list' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'transparent',
                                color: viewMode === 'list' ? 'white' : '#94a3b8',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '600',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            ☰ List
                        </button>
                    </div>
                </div>
            </header>

            {/* Enhanced Controls Section */}
            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: '40px 40px 20px 40px'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto auto',
                    gap: '20px',
                    alignItems: 'center',
                    background: 'rgba(30, 41, 59, 0.6)',
                    backdropFilter: 'blur(10px)',
                    padding: '25px',
                    borderRadius: '20px',
                    border: '1px solid rgba(148, 163, 184, 0.1)'
                }}>
                    {/* Enhanced Search Bar */}
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Search your favorite movies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                padding: '16px 20px 16px 50px',
                                borderRadius: '15px',
                                border: '2px solid rgba(148, 163, 184, 0.2)',
                                fontSize: '16px',
                                width: '100%',
                                background: 'rgba(15, 23, 42, 0.8)',
                                color: 'white',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#3b82f6'
                                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'
                                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
                            }}
                        />
                        <span style={{
                            position: 'absolute',
                            left: '18px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '18px',
                            color: '#64748b'
                        }}>🔍</span>
                    </div>

                    {/* Enhanced Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        style={{
                            padding: '16px 20px',
                            borderRadius: '15px',
                            border: '2px solid rgba(148, 163, 184, 0.2)',
                            fontSize: '16px',
                            background: 'rgba(15, 23, 42, 0.8)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            outline: 'none',
                            cursor: 'pointer',
                            minWidth: '180px'
                        }}
                    >
                        {categories.map(category => (
                            <option key={category} value={category} style={{ background: '#1e293b' }}>
                                {category === 'All' ? '📂 All Genres' : `🎭 ${category}`}
                            </option>
                        ))}
                    </select>

                    {/* Enhanced Sort Options */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '16px 20px',
                            borderRadius: '15px',
                            border: '2px solid rgba(148, 163, 184, 0.2)',
                            fontSize: '16px',
                            background: 'rgba(15, 23, 42, 0.8)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                            outline: 'none',
                            cursor: 'pointer',
                            minWidth: '160px'
                        }}
                    >
                        <option value="rating" style={{ background: '#1e293b' }}>⭐ By Rating</option>
                        <option value="title" style={{ background: '#1e293b' }}>🔤 By Title</option>
                        <option value="date" style={{ background: '#1e293b' }}>📅 By Date</option>
                    </select>

                    {/* Results Counter */}
                    <div style={{
                        color: '#e2e8f0',
                        fontSize: '1rem',
                        fontWeight: '600',
                        textAlign: 'right',
                        minWidth: '120px'
                    }}>
                        {filteredAndSortedMovies.length} result{filteredAndSortedMovies.length !== 1 ? 's' : ''}
                    </div>
                </div>
            </div>

            {/* Movies Display */}
            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: '0 40px 60px 40px'
            }}>
                {viewMode === 'grid' ? (
                    /* Enhanced Grid View */
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '30px'
                    }}>
                        {filteredAndSortedMovies.map((movie) => (
                            <div
                                key={movie.id}
                                style={{
                                    background: 'linear-gradient(145deg, #1e293b 0%, #334155 100%)',
                                    borderRadius: '20px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    border: '1px solid rgba(148, 163, 184, 0.1)'
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                                }}
                            >
                                {/* Movie Poster */}
                                <div style={{ position: 'relative', overflow: 'hidden' }}>
                                    <img
                                        src={movie.poster_path}
                                        alt={movie.title}
                                        style={{
                                            width: '100%',
                                            height: '400px',
                                            objectFit: 'cover',
                                            transition: 'transform 0.4s ease'
                                        }}
                                        onMouseOver={e => {
                                            e.target.style.transform = 'scale(1.08)';
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
                                        borderRadius: '12px',
                                        fontWeight: '700',
                                        fontSize: '14px',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
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
                                        borderRadius: '10px',
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
                                    background: 'rgba(30, 41, 59, 0.9)'
                                }}>
                                    <h2 style={{
                                        margin: '0 0 15px 0',
                                        fontSize: '1.3rem',
                                        color: '#f1f5f9',
                                        fontWeight: '700',
                                        lineHeight: '1.3',
                                        letterSpacing: '-0.5px'
                                    }}>{movie.title}</h2>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '15px',
                                        fontSize: '14px',
                                        color: '#94a3b8'
                                    }}>
                                        <span style={{ marginRight: '8px', fontSize: '16px' }}>📅</span>
                                        <span style={{ fontWeight: '600' }}>Released:</span>
                                        <span style={{ marginLeft: '8px' }}>{formatDate(movie.release_date)}</span>
                                    </div>

                                    {movie.overview && (
                                        <div style={{
                                            marginTop: '15px',
                                            padding: '15px',
                                            background: 'rgba(51, 65, 85, 0.6)',
                                            borderRadius: '12px',
                                            borderLeft: '3px solid #3b82f6'
                                        }}>
                                            <p style={{
                                                margin: '0',
                                                fontSize: '13px',
                                                color: '#cbd5e1',
                                                lineHeight: '1.6'
                                            }}>
                                                {movie.overview.length > 120
                                                    ? `${movie.overview.substring(0, 120)}...`
                                                    : movie.overview}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Enhanced List View */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {filteredAndSortedMovies.map((movie) => (
                            <div
                                key={movie.id}
                                style={{
                                    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                    borderRadius: '20px',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    border: '1px solid rgba(148, 163, 184, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.transform = 'translateX(10px)';
                                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                                }}
                            >
                                {/* Poster */}
                                <div style={{ flexShrink: 0 }}>
                                    <img
                                        src={movie.poster_path}
                                        alt={movie.title}
                                        style={{
                                            width: '120px',
                                            height: '180px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div style={{
                                    padding: '30px',
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '15px'
                                    }}>
                                        <h2 style={{
                                            margin: '0',
                                            fontSize: '1.5rem',
                                            color: '#f1f5f9',
                                            fontWeight: '700'
                                        }}>{movie.title}</h2>

                                        <div style={{
                                            background: getRatingColor(movie.imdb_rating),
                                            color: 'white',
                                            padding: '8px 16px',
                                            borderRadius: '12px',
                                            fontWeight: '700',
                                            fontSize: '14px',
                                            marginLeft: '20px'
                                        }}>
                                            ⭐ {movie.imdb_rating}
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        gap: '25px',
                                        marginBottom: '15px',
                                        fontSize: '14px',
                                        color: '#94a3b8'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ marginRight: '8px' }}>🎭</span>
                                            {movie.category}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <span style={{ marginRight: '8px' }}>📅</span>
                                            {formatDate(movie.release_date)}
                                        </div>
                                    </div>

                                    {movie.overview && (
                                        <p style={{
                                            margin: '0',
                                            fontSize: '14px',
                                            color: '#cbd5e1',
                                            lineHeight: '1.6',
                                            opacity: '0.9'
                                        }}>
                                            {movie.overview}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Results Message */}
                {filteredAndSortedMovies.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        color: '#e2e8f0',
                        fontSize: '1.2rem',
                        marginTop: '50px',
                        padding: '60px 40px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        borderRadius: '20px',
                        maxWidth: '600px',
                        margin: '50px auto 0',
                        border: '1px solid rgba(148, 163, 184, 0.1)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
                        <h3 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', fontWeight: '600' }}>
                            No movies found
                        </h3>
                        <p style={{ fontSize: '1rem', opacity: '0.7', margin: '0' }}>
                            Try adjusting your search or filter criteria to discover more movies.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Movies