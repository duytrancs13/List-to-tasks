import React, { Component } from 'react';
import './TaskForm.css';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        if (this.props.task) {
            let task = {
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            }
            this.state = task;
        } else {
            this.state = {
                id: null,
                name: '',
                status: false
            }
        }
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps && nextProps.task) {
            
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        }
    }

    onCloseTaskForm = () => {
        this.props.onCloseTaskForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })

    }
    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.name.length > 0) {
            this.props.onSubmit(this.state);
        }

    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        return (
            <div className="task-form">
                <div className="alert alert-warning" role="alert">
                    {this.props.addEdit === 'add' ? 'Thêm ' : 'Cập nhật '}công việc
                    <i className="fa fa-times pull-right" onClick={this.onCloseTaskForm} aria-hidden="true" style={{ cursor: 'pointer' }}></i>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.onSubmit}>
                            <label>Tên:</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                            <br />
                            <label>Trạng thái:</label>
                            <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
                                <option value={true}>Kích hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br />
                            <div className="bottom">
                                <button className="btn btn-primary" disabled={!this.state.name}> <i className="fa fa-plus" aria-hidden="true"></i> Lưu lại</button>&nbsp;
                                <button className="btn btn-danger" disabled={!this.state.name} onClick={this.onClear}> <i className="fa fa-times" aria-hidden="true" ></i> Hủy bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskForm;