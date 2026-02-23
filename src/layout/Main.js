import './Main.css';
import React from 'react';
import Preloader from '../components/Preloader.js';
import MoviesList from '../components/MoviesList.js';
import Search from '../components/Search.js';

class Main extends React.Component {
    state = {
        movies: [],
        count: 0,
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch('https://www.omdbapi.com/?apikey=ea2ec2e3&s=Coraline')
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    this.setState({ 
                        movies: data.Search ? this.removeDuplicates(data.Search) : [], 
                        count: data.totalResults || 0,
                        loading: false
                    });
                } else {
                    this.setState({ movies: [], count: 0, loading: false });
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки:', error);
                this.setState({ loading: false });
            });
    }

    // Удаление дубликатов фильмов с одинаковым imdbID
    removeDuplicates = (moviesArray) => {
        if (!moviesArray) return [];
        
        const uniqueIds = {};
        return moviesArray.filter(movie => {
            if (!uniqueIds[movie.imdbID]) {
                uniqueIds[movie.imdbID] = true;
                return true;
            }
            return false;
        });
    }

    searchMovie = (str, type = 'all', page = 1) => {
        if (!str.trim()) return; 
        
        this.setState({ loading: true });
        
        let url = `https://www.omdbapi.com/?apikey=ea2ec2e3&s=${encodeURIComponent(str)}&page=${page}`;
        if (type !== 'all') {
            url += `&type=${type}`;
        }
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    this.setState({ 
                        movies: data.Search ? this.removeDuplicates(data.Search) : [], 
                        count: parseInt(data.totalResults) || 0,
                        loading: false
                    });
                } else {
                    this.setState({ movies: [], count: 0, loading: false });
                    console.log('Фильмы не найдены:', data.Error);
                }
            })
            .catch(error => {
                console.error('Ошибка поиска:', error);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div className='main'>
                <Search 
                    searchMovie={this.searchMovie} 
                    totalCount={this.state.count} 
                />
                <div className='wrap'>
                    {this.state.loading ? (
                        <Preloader />
                    ) : (
                        <>
                            {this.state.movies && this.state.movies.length > 0 ? (
                                <MoviesList movies={this.state.movies} />
                            ) : (
                                <div className="no-results">Movies not found</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default Main;