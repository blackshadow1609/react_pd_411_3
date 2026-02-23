import './Search.css';
import React from 'react';

class Search extends React.Component {
    state = {
        search: "",
        type: "all",
        page: 1
    }

    prevPage = () => {
        this.setState(
            (prevState) => ({ page: Math.max(1, prevState.page - 1) }),
            () => {
                this.props.searchMovie(this.state.search, this.state.type, this.state.page)
            }
        )
    }

    nextPage = () => {
        const totalPages = Math.ceil(this.props.totalCount / 10) || 1;
        this.setState(
            (prevState) => ({ page: Math.min(totalPages, prevState.page + 1) }),
            () => {
                this.props.searchMovie(this.state.search, this.state.type, this.state.page)
            }
        )
    }

    setPage = (num) => {
        this.setState(
            () => ({ page: num }),
            () => {
                this.props.searchMovie(this.state.search, this.state.type, this.state.page)
            }
        )
    }

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.setState({ page: 1 }, () => {
                this.props.searchMovie(this.state.search, this.state.type, this.state.page);
            });
        }
    }


    handleFilter = (event) => {
        this.setState(
            () => ({
                type: event.target.dataset.type,
                page: 1
            }),
            () => {
                if (this.state.search.trim()) {
                    this.props.searchMovie(this.state.search, this.state.type, this.state.page);
                }
            }
        );
    }


    handleSearch = () => {
        this.setState({ page: 1 }, () => {
            this.props.searchMovie(this.state.search, this.state.type, this.state.page);
        });
    }

    render() {
        const limit = 10;
        const totalPages = Math.ceil(this.props.totalCount / limit) || 1;

        const maxVisiblePages = 10;
        let startPage = Math.max(1, this.state.page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        let pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <>
                <div className='search'>
                    <input
                        type='search'
                        placeholder='Поиск'
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onKeyDown={this.handleKey}
                        className='search-input'
                    />
                    <button
                        className='btn search-btn'
                        onClick={this.handleSearch}
                        disabled={!this.state.search.trim()}
                    >
                        Поиск
                    </button>
                </div>

                <div className='filters'>
                    <div className='radio-group'>
                        <div className='radio-item'>
                            <input
                                type='radio'
                                name='type'
                                id='all'
                                data-type="all"
                                checked={this.state.type === 'all'}
                                onChange={this.handleFilter}
                            />
                            <label htmlFor='all'>All</label>
                        </div>

                        <div className='radio-item'>
                            <input
                                type='radio'
                                name='type'
                                id='movie'
                                data-type="movie"
                                checked={this.state.type === 'movie'}
                                onChange={this.handleFilter}
                            />
                            <label htmlFor='movie'>Movie</label>
                        </div>

                        <div className='radio-item'>
                            <input
                                type='radio'
                                name='type'
                                id='series'
                                data-type="series"
                                checked={this.state.type === 'series'}
                                onChange={this.handleFilter}
                            />
                            <label htmlFor='series'>Series</label>
                        </div>

                        <div className='radio-item'>
                            <input
                                type='radio'
                                name='type'
                                id='game'
                                data-type="game"
                                checked={this.state.type === 'game'}
                                onChange={this.handleFilter}
                            />
                            <label htmlFor='game'>Game</label>
                        </div>
                    </div>
                </div>

                {this.props.totalCount > 0 && totalPages > 1 && (
                    <div className='pagination'>
                        <button
                            className='btn page-btn'
                            onClick={this.prevPage}
                            disabled={this.state.page === 1}
                        >
                            Prev
                        </button>

                        <div className='page-numbers'>
                            {pages.map((pageNum) => (
                                <button
                                    className={`btn page-number ${this.state.page === pageNum ? 'active' : ''}`}
                                    style={{
                                        backgroundColor: this.state.page === pageNum ? '#007bff' : '#6c757d',
                                        color: 'white'
                                    }}
                                    key={pageNum}
                                    onClick={() => this.setPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>

                        <button
                            className='btn page-btn'
                            onClick={this.nextPage}
                            disabled={this.state.page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}

                {this.props.totalCount > 0 && (
                    <div className='results-info'>
                        Найдено: {this.props.totalCount}
                    </div>
                )}
            </>
        )
    }
}

export default Search;