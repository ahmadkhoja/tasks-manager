import React from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import { object } from 'prop-types';
import './Tasks.css'
// import { withStyles } from '@material-ui/core/styles';


const Task = ({ task_id, name,priority,handleTextChange,handleNumberChange,addTask, tasks }) => (
    <div>

            <TextField
                // id="name"
                name="task_name"
                label='Task Name'
                value={name}
                onChange={(event) => handleTextChange(event,task_id)}
                // margin="normal"
            />
            <TextField
                label="Priority"
                value={priority}
                onChange={(event) => handleNumberChange(event,task_id)}
                type="number"
                inputProps={{ min: "1", max: "10", step: "1" }}
                style={ {marginLeft:'30px'} }
                // margin="normal"
            />
            
    </div>
)


export default class Tasks extends React.Component {
    constructor(props){
        super(props)
        // this.state = {
        //     task_name: '',
        //     priority:1
        // }
    }

    handleTextChange = (event,id) => {
        // console.log(event.target.value,id)
        this.props.changeTaskName(event.target.value,id)
      };
      handleNumberChange = (event,id) => {
        this.props.changePriority(parseInt(event.target.value,10),id)
      }
      addTask = () => {
          this.props.addNewTask()
      }

      renderTasks = () => {
          return (
              this.props.first_day_tasks.map( (task,i,tasks) => 
                    <Task
                        key={task.task_id}
                        name={task.name}
                        task_id={task.task_id}
                        priority={task.priority} 
                        handleTextChange={this.handleTextChange} 
                        handleNumberChange={this.handleNumberChange}
                        // addTask={this.addTask}
                        tasks={tasks}
                        // {...task} 
                    />
          )
        )
      }
    
    render(){
        // console.log('this.props.first_day_tasks',this.props.first_day_tasks);
        return(
            <div>
                <h1>Tasks Page</h1>

                <Button color="primary" variant="contained" style={ {marginLeft:'30px'} } onClick={this.addTask}>  Add Task </Button>
                {this.renderTasks()}
                
                <Button color="primary" variant="contained" onClick={ () => {
                    this.props.history.push('/day')
                } }> Save </Button>     

            </div>
        )
    }
}