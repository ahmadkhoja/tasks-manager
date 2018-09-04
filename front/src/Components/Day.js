import React from 'react'
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

  const DayDetails = ({name, isComplete, hours_spent, priority, task_id}) => (
    <Paper>
        <Table>    
            <TableHead>
                <TableRow>
                    <TableCell> Tasks </TableCell>
                    <TableCell> Complete </TableCell>
                    <TableCell> number of hours spent </TableCell>
                    <TableCell> priority </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">
                        {name}
                    </TableCell>
                    <TableCell >
                        { '' + isComplete}
                    </TableCell>
                    <TableCell>
                        { ''+ hours_spent + ' hours'}
                    </TableCell>
                    <TableCell >
                        { '' + priority}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Paper>
  ) 
  const DayDetailsEdit = ({name, isComplete, hours_spent, priority, task_id, handleTextChange, handleNumberChange, handleHoursSpent, handleIsCompleted }) => (
    <Paper>
        <Table>    
            <TableHead>
                <TableRow>
                    <TableCell> Task  </TableCell>
                    <TableCell> Complete </TableCell>
                    <TableCell> number of hours spent </TableCell>
                    <TableCell> priority </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">
                        <TextField
                            name="task_name"
                            // label='Task Name'
                            value={name}
                            onChange={(event) => handleTextChange(event,task_id)}
                        />
                    </TableCell>
                    <TableCell >
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={isComplete}
                            onChange={(event) => handleIsCompleted(event,task_id)}
                            // labelStyle={{color: 'blue'}}
                            // iconStyle={{fill: 'blue'}}
                            style={{color:'#777'}}
                            />
                        }
                        // label="Completed"
                    />
                    </TableCell>
                    <TableCell>
                        <TextField
                            // label="Hours Spent"
                            value={hours_spent}
                            onChange={(event) => handleHoursSpent(event,task_id)}
                            type="number"
                            // inputProps={{ min: "1", max: "10", step: "1" }}
                            // style={ {marginLeft:'30px'} }
                        />
                    </TableCell>
                    <TableCell >
                        <TextField
                            // label="Priority"
                            value={priority}
                            onChange={(event) => handleNumberChange(event,task_id)}
                            type="number"
                            inputProps={{ min: "1", max: "10", step: "1" }}
                            // style={ {marginLeft:'30px'} }
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Paper>
  ) 

class Day extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            viewMode: false
        }
    }

    handleTextChange = (event,id) => {
        // console.log(event.target.value,id)
        this.props.changeTaskName(event.target.value,id)
    };

    handleNumberChange = (event,id) => {
        this.props.changePriority(parseInt(event.target.value,10),id)
    }
    handleHoursSpent = (event,id) => {
        this.props.changeHoursSpent(parseInt(event.target.value,10),id)        
    }
    handleIsCompleted = (event,id) => {
        this.props.changeIsCompleted(event.target.checked,id)        
    }

    sortTasks = (a, b) => {
        let comparison = 0

        if (a.priority > b.priority)
            comparison = 1;
        else if (a.priority < b.priority)
            comparison = -1;

        return comparison;
    }

    renderDayDetailView = () => {
        return (   
        this.props.first_day_tasks.sort(this.sortTasks).reverse()
        .map(task => 
                <DayDetails 
                    key={task.task_id}
                    name = { task.name }
                    isComplete = { task.isComplete }
                    hours_spent = { task.hours_spent }
                    priority = { task.priority }
                    task_id = {task.task_id}
                />    
            )
        )
    }
    renderDayDetailEdit = () => {
        return (   
        this.props.first_day_tasks.sort(this.sortTasks).reverse()
        .map(task => 
                <DayDetailsEdit 
                    key={task.task_id}
                    name = { task.name }
                    isComplete = { task.isComplete }
                    hours_spent = { task.hours_spent }
                    priority = { task.priority }
                    task_id = {task.task_id}
                    handleTextChange={this.handleTextChange}
                    handleNumberChange= {this.handleNumberChange}
                    handleHoursSpent= {this.handleHoursSpent}
                    handleIsCompleted= {this.handleIsCompleted}
                />    
            )
        )
    }
    renderFirstDayTasks = () => {
        if(this.state.viewMode === true){
            return this.renderDayDetailView()
        }else{
            return this.renderDayDetailEdit()
        }
    }

    finishDay = () => {
        this.props.history.push('/home')
    }

    render(){
        return(
            <div>
                <h1>Day 1 </h1>

                { this.state.viewMode ? <Button color="primary" variant="contained" onClick={() => { this.setState({viewMode: !this.state.viewMode}) }}> Edit Mode </Button> : 
                <Button color="primary" variant="contained" onClick={() => { this.setState({viewMode: !this.state.viewMode}) }}> View Mode </Button>}

                { this.renderFirstDayTasks() }

                <Button color="primary" variant="contained" onClick={ this.finishDay }> Finish Day 1 </Button>

            </div>
        )
    }
}


export default withStyles(styles)(Day);