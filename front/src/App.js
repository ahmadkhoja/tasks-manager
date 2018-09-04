import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Tasks from './Components/Tasks'
import Day from './Components/Day'


import update from 'react-addons-update';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      name:'batata',
      days:[
        {
          day_id:0,
          tasks:[
            {
              task_id:0,
              name:'test the app',
              isComplete: false,
              priority: 1,
              hours_spent: 0
            }
          ]
        }
      ]
    }
  }

  changeTaskName = (task_name,id) => {

    let copyState = this.state.days[0].tasks[id]
    Object.assign({},this.state,copyState)
    copyState.name = task_name
    // it's like this.setState
    this.state.days[0].tasks[id].name = copyState.name
    this.forceUpdate()
    // this.setState({ tasks: update(this.state.tasks,{ 0:{ name:{ $set: copyState.name } } }) })
  }

  changePriority = (task_priority,id) => {
    let copyState = this.state.days[0].tasks[id]
    Object.assign({},this.state,copyState)
    copyState.priority = task_priority
    // it's like this.setState
    this.state.days[0].tasks[id].priority = copyState.priority
    this.forceUpdate()
  }
  changeHoursSpent = (task_hours_spent,id) => {
    let copyState = this.state.days[0].tasks[id]
    Object.assign({},this.state,copyState)
    copyState.hours_spent = task_hours_spent
    // it's like this.setState
    this.state.days[0].tasks[id].hours_spent = copyState.hours_spent
    this.forceUpdate()
  }
  changeIsCompleted = (task_is_completed,id) => {
    let copyState = this.state.days[0].tasks[id]
    Object.assign({},this.state,copyState)
    copyState.isComplete = task_is_completed
    // it's like this.setState
    this.state.days[0].tasks[id].isComplete = copyState.isComplete
    this.forceUpdate()
  }

  addNewTask = () => {
    let newId = this.state.days[0].tasks.length -1
    newId++
    let newTask = {
      task_id: newId,
      name:'test the app',
      isComplete: false,
      priority: 1,
      hours_spent: 0
    }
    console.log(newTask)
    let tasks = this.state.days[0].tasks
    tasks.push(newTask)
    this.setState({tasks})
    

    // this.refs.btn.setAttribute("disabled", "disabled");
    // console.log(this.state.days[0].tasks)
    
  }


  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/tasks" render={ (match)=>
            < Tasks 
              history={match.history}
              first_day_tasks={this.state.days[0].tasks}
              changeTaskName={this.changeTaskName}
              changePriority={this.changePriority}
              addNewTask={this.addNewTask}
            />
          }/>
          <Route path="/home" render={ (match) => 
              <Home
                history={match.history}
                first_day_tasks={this.state.days[0].tasks}
              />
            }/>
          <Route path="/day" render={ (match) => 
              <Day
                history={match.history}
                first_day_tasks={this.state.days[0].tasks}
                changeTaskName={this.changeTaskName}
                changePriority={this.changePriority}
                changeHoursSpent={this.changeHoursSpent}
                changeIsCompleted={this.changeIsCompleted}
              />
            }/>
          <Route path="/" render={ (match) => 
              <Login
                history={match.history}
              />
            }/>
        </Switch>
      </div>
    );
  }
}

export default App;
