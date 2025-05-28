import React from 'react'
import { useState } from 'react'
import { movies } from './data'
const Movies = () => {
    const [movieList] = useState(movies)
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white tracking-tight drop-shadow-lg">
                🎬 MovieZone
            </h1>
            <div className="flex flex-wrap gap-10 justify-center">
                {movieList.map((movie) => (
                    <div
                        key={movie.id}
                        className="relative w-72 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-yellow-400/40 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="relative w-full h-96">
                            <img
                                src={movie.poster_path}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                                {movie.category}
                            </span>
                            <span className="absolute top-4 right-4 bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-gray-100 text-xs font-bold px-2 py-1 rounded shadow">
                                {movie.release_date}
                            </span>
                        </div>
                        <div className="p-5 w-full flex flex-col items-center">
                            <h3 className="mb-2 text-xl font-bold text-center text-gray-900 dark:text-gray-100 line-clamp-2">{movie.title}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-yellow-500 text-lg">★</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{movie.imdb_rating}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">(IMDB)</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Movies