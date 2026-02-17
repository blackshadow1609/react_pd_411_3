import './Main.css';
import React from 'react';
import MoviesList from '../components/MoviesList.js';

class Main extends React.Component {
    state = {
        movies: []
    }
    componentDidMount() {
        fetch('https://www.omdbapi.com/?apikey=ea2ec2e3&s=Home%20Alone')
            .then(response => response.json())
            .then(data => this.setState({ movies: data.Search }));
    }
    render() {
        return (
            <div className='main'>
                <div className='wrap'>
                    <MoviesList movies={this.state.movies} />
                </div>
            </div>
        )
    }
}
export default Main;