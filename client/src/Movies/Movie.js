import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = e => {
    e.preventDefault();
    this.props.history.push(`/update-movie/${this.props.match.params.id}`);  
  }

  deleteNovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${parseInt(this.props.match.params.id)}`)
      .then(res => {
        //res.data should be the id of removed movie
        this.props.history.push('/');
      }).catch(err => console.log(err));
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="edit-button" onClick={this.editMovie}>
          Edit
        </div>
        <div className="delete-button" onClick={this.deleteNovie}>
          Delete
        </div>
      </div>
    );
  }
}
