import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
  wrapper: {
    width: '50%',
    height: '10%',
    marginRight: '0px',
    paddingRight: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  addInput: {
    border: '1px solid black',
    width: '100px',
  },
  addButton: {
    border: '1px solid black',
    borderLeft: 'none',
  },
};

export default class TaskAdd extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {

      task: {
        id: '',
        taskName: '',
        description: 'Enter description...',
        isDone: false,
      },

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} style={styles.wrapper}>
        <TextField
          value={this.state.task.taskName}
          onChange={this.handleChange}
          floatingLabelText="Task name..."
          style={{width: '140px', marginBottom: '23px', fontSize: '18px'}}
        />
        <RaisedButton onClick={this.handleSubmit}
                      label="Add"
                      style={{marginBottom: '5px'}}/>
      </form>
    );
  }

  handleChange(event){

    let task = {...this.state.task};
    task.taskName = event.target.value;
    task.id = this.props.nextId;

    this.setState({task});
  }

  handleSubmit(event){
    event.preventDefault();

    if(this.state.task.taskName) {
      this.props.onAddTask(this.state.task);
    }

    this.setState(prevState => {
      return {
        task: {
          id: '',
          taskName: '',
          description: 'Add description...',
          isDone: false,
        }
      }
    })
  }
}
