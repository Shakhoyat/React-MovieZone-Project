import React from 'react'
import { useState } from 'react'
import { movies } from './data'
const Movies = () => {
    const [movieList, setmovieList] = useState(movies)
    return (
        <div className="flex flex-wrap gap-20 p-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen justify-center">
            {movieList.length === 0 ? (
                <div className="text-4xl text-gray-500 mt-40">No movies found.</div>
            ) : (
                movieList.map((movie) => (
                    <div
                        key={movie.id}
                        className="w-[44rem] h-[66rem] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 cursor-pointer flex flex-col hover:scale-105 border-4 border-blue-200 hover:border-blue-500 hover:shadow-3xl"
                    >
                        <div className="flex-1 relative">
                            <img
                                src={movie.poster_path}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-16 py-16">
                                <h3 className="text-5xl font-bold text-white mb-6 truncate">{movie.title}</h3>
                                <div className="flex flex-wrap gap-6 mb-6">
                                    <span className="bg-blue-700/90 text-white px-6 py-3 rounded text-2xl font-semibold">
                                        {movie.category}
                                    </span>
                                    <span className="bg-gray-800/90 text-gray-100 px-6 py-3 rounded text-2xl">
                                        {movie.release_date}
                                    </span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="font-semibold text-gray-200 text-2xl">IMDB:</span>
                                    <span className="text-yellow-400 font-bold bg-yellow-900/80 px-6 py-3 rounded-lg shadow-md text-2xl">
                                        ★ {movie.imdb_rating}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Movies