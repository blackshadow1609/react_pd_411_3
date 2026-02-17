import './Main.css';
import React from 'react';
import Preloader from '../components/Preloader.js';
import MoviesList from '../components/MoviesList.js';

class Main extends React.Component {
    state = {
        movies: []
    }
    componentDidMount() {
        fetch('https://www.omdbapi.com/?apikey=ea2ec2e3&s=Coraline')
            .then(response => response.json())
            .then(data => this.setState({ movies: data.Search }));
    }
    render() {
        return (
            <div className='main'>
                <div className='wrap'>
                    {this.state.movies.length === 0 ? <Preloader /> : <MoviesList movies={this.state.movies} />}
                </div>
            </div>
        )
    }
}
export default Main;