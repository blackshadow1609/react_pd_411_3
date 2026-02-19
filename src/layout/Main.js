import './Main.css';
import React from 'react';
import Preloader from '../components/Preloader.js';
import MoviesList from '../components/MoviesList.js';
import Search from '../components/Search.js';

class Main extends React.Component {
    state = {
        movies: [],
        count: 0
    }
    
    componentDidMount() {
        fetch('https://www.omdbapi.com/?apikey=ea2ec2e3&s=Coraline')
            .then(response => response.json())
            .then(data => {
                if (data.Search && Array.isArray(data.Search)) {
                    const uniqueMovies = this.removeDuplicates(data.Search);
                    this.setState({ movies: uniqueMovies });
                }
            });
    }
    
    // Что бы не фильмов с одинаковым imdbID--------------------------------------
    removeDuplicates = (moviesArray) => {
        const uniqueIds = {};
        
        return moviesArray.filter(movie => {
            if (!uniqueIds[movie.imdbID]) {
                uniqueIds[movie.imdbID] = true;
                return true;
            }
            return false;
        });
    }
    // ----------------------------------------------------------------------------
    
    searchMovie = (str, type = 'all', page = 1) => {
        fetch(`https://www.omdbapi.com/?apikey=ea2ec2e3&s=${str}${type !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}`)
            .then(response => response.json())
            .then(data => {
                if (data.Search && Array.isArray(data.Search)) {
                    const uniqueMovies = this.removeDuplicates(data.Search);
                    this.setState({ movies: uniqueMovies });
                } else {
                    this.setState({ movies: [] });
                }
            });
    }
    
    render() {
        return (
            <div className='main'>
                <Search searchMovie={this.searchMovie} totalCount={this.state.count} />
                <div className='wrap'>
                    {this.state.movies != null && this.state.movies.length === 0 ? <Preloader /> : <MoviesList movies={this.state.movies} />}
                </div>
            </div>
        )
    }
}

export default Main;