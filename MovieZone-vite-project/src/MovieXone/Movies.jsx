import React from 'react'
import { useState } from 'react'
import { movies } from './data'
import { ssrDynamicImportKey } from 'vite/module-runner'
const Movies = () => {
    const [movieList, setmovieList] = useState(movies)
    return (
        <>
            <div className="my-3 bg-dark d-flex justify-content-center align-items-center flex-wrap gap-2">
                <button type="button" className="btn btn-outline-primary">All</button>
                <button type="button" className="btn btn-outline-secondary">Action</button>
                <button type="button" className="btn btn-outline-success">Thriller</button>
                <button type="button" className="btn btn-outline-danger">Animation</button>
                <button type="button" className="btn btn-outline-warning">Horror</button>
                <button type="button" className="btn btn-outline-info">Sci Fi</button>
                <button type="button" className="btn btn-outline-light">Drama</button>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '32px',
                padding: '32px',
                background: 'black',
                minHeight: '100vh',
                justifyContent: 'center'
            }}>
                {movieList.map((movie) => (
                    <div
                        key={movie.id}
                        style={{
                            width: '240px',
                            background: '#fff',
                            border: 'none',
                            borderRadius: '16px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            transition: 'transform 0.2s',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img
                            src={movie.poster_path}
                            alt={movie.title}
                            style={{
                                width: '100%',
                                height: '340px',
                                objectFit: 'cover',
                                borderTopLeftRadius: '16px',
                                borderTopRightRadius: '16px'
                            }}
                        />
                        <div style={{ padding: '18px 16px 12px 16px', width: '100%' }}>
                            <h3 style={{
                                margin: '0 0 8px 0',
                                fontSize: '1.15rem',
                                color: '#222',
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>{movie.title}</h3>
                            <div style={{ fontSize: '0.97rem', color: '#555', marginBottom: '6px', textAlign: 'center' }}>
                                <span style={{ fontWeight: 500 }}>Release:</span> {movie.release_date}
                            </div>
                            <div style={{ fontSize: '0.97rem', color: '#555', marginBottom: '6px', textAlign: 'center' }}>
                                <span style={{ fontWeight: 500 }}>Category:</span> {movie.category}
                            </div>
                            <div style={{ fontSize: '0.97rem', color: '#555', textAlign: 'center' }}>
                                <span style={{ fontWeight: 500 }}>IMDB:</span>
                                <span style={{
                                    marginLeft: '6px',
                                    color: '#f5b50a',
                                    fontWeight: 700,
                                    background: '#fff',
                                    padding: '2px 6px',
                                    borderRadius: '6px'
                                }}>★ {movie.imdb_rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Movies