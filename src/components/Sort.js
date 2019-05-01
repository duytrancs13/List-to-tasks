import React, { Component } from 'react';

class Sort extends Component {
    render() {
        return (
            <div className="col-md-6">
                <div className="btn-group">
                    <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sắp xếp
                            </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="x">Action</a>
                        <a className="dropdown-item" href="x">Another action</a>
                        <a className="dropdown-item" href="x">Something else here</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="x">Separated link</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sort;