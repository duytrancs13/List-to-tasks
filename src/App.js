import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Search from './components/Search';
import Sort from './components/Sort';
import TaskList from './components/TaskList';




class App extends Component {

  constructor(props) {
    super(props);
    if (localStorage.getItem('tasks')) {
      this.state = {
        tasks: JSON.parse(localStorage.getItem('tasks')),
        isShowTaskForm: false,
        addEdit: 'add',
        taskEditting: null,
        filter: {
          name: '',
          status: -1
        }
      }
    } else {
      let tasks = [
        { id: 1, name: 'Học lập trình Reactjs', status: true },
        { id: 2, name: 'Học lập trình Angularjs', status: false },
        { id: 3, name: 'Học lập trình PHP', status: true },
        { id: 4, name: 'Học lập trình Java', status: false },
        { id: 5, name: 'Học lập trình C++', status: true }
      ]
      this.state = {
        tasks: tasks,
        isShowTaskForm: false,
        addEdit: 'add',
        taskEditting: null,
        filter: {
          name: '',
          status: -1
        }
      }
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
  }
  onToggleTaskForm = () => {
    this.setState({
      isShowTaskForm: !this.state.isShowTaskForm,
      addEdit: 'add',
      taskEditting: null
    });
  }

  closeTaskForm = () => {
    this.setState({
      isShowTaskForm: false
    })
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    let index = tasks.findIndex(task => (task.id === id));
    tasks[index].status = !tasks[index].status;

    /* tasks = tasks.map((task) => {
      if (task.id === id) {
        task.status = !task.status;
      }
    }) */
    this.setState({
      tasks: tasks
    })

  }

  onDeleteTask = (id) => {
    var { tasks } = this.state;
    tasks = tasks.filter(task => task.id !== id)

    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  onUpdate = (id) => {
    if (id) {
      var { tasks } = this.state;
      var task = tasks.filter(task => task.id === id);
      this.setState({
        isShowTaskForm: true,
        addEdit: 'edit',
        taskEditting: task[0]
      });
    } else {
      this.setState({
        taskEditting: null
      })
    }
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id) {
      let index = tasks.findIndex(task => (task.id === data.id));
      tasks[index] = data;
      this.setState({
        isShowTaskForm: false,
        tasks: tasks
      })

    } else {
      var task = {
        id: this.state.tasks.length + 1,
        name: data.name,
        status: data.status
      }
      tasks.push(task);
      this.setState({
        tasks: tasks
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.closeTaskForm();
    }
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus
      }
    })
  }

  render() {
    var { tasks, isShowTaskForm, addEdit, taskEditting, filter } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => task.name.includes(filter.name))
      }
     
      if (filter.status === 0 || filter.status === 1) {
        tasks = tasks.filter(task => task.status === (filter.status === 1 ? true : false))
      }
    }
    var elementTaskForm = isShowTaskForm ? <TaskForm onSubmit={this.onSubmit} onCloseTaskForm={this.closeTaskForm} addEdit={addEdit} task={taskEditting} /> : '';
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 style={{ textAlign: 'center', color: 'red' }}>Quản lý công việc</h1>
          </div>
        </div>
        <br />
        <div className="row">
          <div className={isShowTaskForm ? 'col-md-4' : ''}>
            {elementTaskForm}
          </div>
          <div className={isShowTaskForm ? 'col-md-8' : 'col-md-12'}>
            <div className="row">
              <div className="col-md-12">
                <button className="btn btn-primary" disabled={isShowTaskForm} onClick={this.onToggleTaskForm}> <i className="fa fa-plus" aria-hidden="true"></i> Thêm công việc</button>
              </div>
            </div>
            <br />
            <div className="row">
              <Search />
              <Sort />
            </div>
            <br />
            <TaskList tasks={tasks} onUpdateStatus={this.onUpdateStatus} onUpdate={this.onUpdate} onDeleteTask={this.onDeleteTask} onFilter={this.onFilter} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
