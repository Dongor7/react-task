import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'

import Task from './Task';

const styles = {
  wrapper: {
    border: '1px solid #bdbdbd',
    width: '65%',
    height: '76%',
    margin: '0',
    padding: '5px',
    overflowY: 'scroll',
  },
  taskWrapper: {
    width: '100%',
    height: '50px',
    marginBottom: '5px',
    padding: '0 15px',
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
};

export default class Tasks extends React.PureComponent {

  constructor(props){
    super(props);

    this.getTasksList = this.getTasksList.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  getTasksList(){
    let list = this.props.tasks.map((task) =>
      <Task key={task.id} task={task}
            onCheckEditMode={this.props.onCheckEditMode}
            onEditTask={this.props.onEditTask}
      />
    );

    return list;
  }

  handleCheckboxChange(){

  }

  render() {
    return(
      <div style={styles.wrapper}>
        {
          this.getTasksList()
        }
      </div>
    );
  }
}
