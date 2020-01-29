import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default () => {
    const { id } = useParams();
    const initialValue = {
        id: id,
        title: '',
        director: '',
        metascore: '',
        stars: ''
    }
    const [movie, setMovie] = useState(initialValue);

    const reduceStars = () => {
        //use this to convert the array of stars to a long string.
        const newStars = movie.stars?.reduce((acc, cur) => `${acc}, ${cur}`);
    }

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <input type='text' name='title' placeholder='Title' value={movie.title} onChange={handleChange} />
            <input type='text' name='director' placeholder='Director' value={movie.director} onChange={handleChange} />
            <input type='number' name='metascore' placeholder='Metascore' value={parseInt(movie.metascore)} onChange={handleChange} />
            <input type='textarea' name='stars' placeholder='Stars' value={movie.stars} onChange={handleChange} />
            <button>Update</button>
        </div>
    );
}