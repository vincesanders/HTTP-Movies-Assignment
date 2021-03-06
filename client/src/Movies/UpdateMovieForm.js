import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default () => {
    const history = useHistory();
    const { id } = useParams();
    const initialValue = {
        id: parseInt(id),
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

    useEffect(() => {
        //get movie info to populate inputs when form is first loaded
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                let gotMovie = {
                    id: parseInt(id),
                    title: res.data.title,
                    director: res.data.director,
                    metascore: res.data.metascore,
                    stars: res.data.stars.reduce((acc, cur) => `${acc}, ${cur}`)
                };
                setMovie(gotMovie);
            })
            .catch(err => console.log(err.response));
    },[id]);

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const commitChanges = e => {
        e.preventDefault();
        let movieToSend = {
            ...movie,
            //stars must be entered in this format: star name, another star, etc...
            stars: movie.stars.split(', ')
        }
        axios.put(`http://localhost:5000/api/movies/${id}`, movieToSend)
            .then(res => {
                //res.data is the changed movie object.
                history.push(`/movies/${id}`);
            }).catch(err => console.log(err));
    }

    return (
        <form onSubmit={commitChanges}>
            <h2>Update Movie</h2>
            <input type='text' name='title' placeholder='Title' value={movie.title} onChange={handleChange} />
            <input type='text' name='director' placeholder='Director' value={movie.director} onChange={handleChange} />
            <input type='number' name='metascore' placeholder='Metascore' value={movie.metascore} onChange={handleChange} />
            <input type='textarea' name='stars' placeholder='Stars' value={movie.stars} onChange={handleChange} />
            <button>Update</button>
        </form>
    );
}