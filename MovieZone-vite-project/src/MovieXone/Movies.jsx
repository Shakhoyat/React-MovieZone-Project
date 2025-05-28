import React from 'react'
import { useState } from 'react'
import { movies } from './data'
const Movies = () => {
    const [movieList, setmovieList] = useState(movies)
    return (
        <div className="flex flex-wrap gap-8 p-8 min-h-screen justify-center bg-[#f5f7fa] dark:bg-gray-900 transition-colors">
            {movieList.map((movie) => (
                <div
                    key={movie.id}
                    className="w-60 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-105"
                >
                    <img
                        src={movie.poster_path}
                        alt={movie.title}
                        className="w-full h-[340px] object-cover rounded-t-2xl"
                    />
                    <div className="p-4 w-full">
                        <h3 className="mb-2 text-lg font-semibold text-center text-gray-900 dark:text-gray-100">{movie.title}</h3>
                        <div className="text-base text-gray-600 dark:text-gray-300 mb-1 text-center">
                            <span className="font-medium">Release:</span> {movie.release_date}
                        </div>
                        <div className="text-base text-gray-600 dark:text-gray-300 mb-1 text-center">
                            <span className="font-medium">Category:</span> {movie.category}
                        </div>
                        <div className="text-base text-gray-600 dark:text-gray-300 text-center">
                            <span className="font-medium">IMDB:</span>
                            <span className="ml-2 text-yellow-500 font-bold bg-white dark:bg-gray-700 px-2 py-0.5 rounded-md">★ {movie.imdb_rating}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Movies