import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
    render() {
        return (
            <div className="col-md-6 search">
                <input type="text" placeholder="Tìm kiếm" className="form-control" />
                <button className="btn btn-primary">Tìm</button>
            </div>
        );
    }
}

export default Search;