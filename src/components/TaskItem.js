import React, { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {
        var { task } = this.props;
        return (
            <tr>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td><button onClick={this.onUpdateStatus} className={task.status ? 'btn btn-primary' : 'btn btn-warning'} >{task.status ? 'Kích hoạt' : 'Ẩn'} </button></td>
                <td className="action">
                    <button className="btn btn-warning" onClick={this.onUpdate}><i className="fa fa-pencil" aria-hidden="true"></i> Chỉnh sửa</button>&nbsp;
                    <button className="btn btn-danger" onClick={this.onDeleteTask}><i className="fa fa-times" aria-hidden="true" ></i> Xóa</button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;