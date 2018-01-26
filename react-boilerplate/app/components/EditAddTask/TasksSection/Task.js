import React from 'react';
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  taskWrapper: {
    width: '100%',
    height: '50px',
    marginBottom: '5px',
    padding: '0 15px',
    border: '1px solid #bdbdbd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
};

export default class Tasks extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {
      checked: this.props.task.isDone,
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  render() {

    const task = this.props.task;

    return(
      <div style={styles.taskWrapper}>
        <label>
          <Checkbox
            label={task.taskName}
            checked={this.state.checked}
            onCheck={() => {
              this.handleCheckboxChange(task);
            }}
            style={{width: '145px'}}
          />

        </label>
        <Link to={'/edit/' + task.id} onClick={() => this.props.onCheckEditMode(task)}>
          <RaisedButton label="Edit" />
        </Link>
      </div>
    );
  }

  handleCheckboxChange(task){
    this.setState(prevState => {
      return {
        checked: !prevState.checked,
      }
    });

    task.isDone = !task.isDone;
    this.props.onEditTask(task);
  }
}
