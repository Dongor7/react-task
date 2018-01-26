import React from 'react';
import { Link } from 'react-router-dom'
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
  addWrapper: {
    border: '1px solid #bdbdbd',
    width: '65%',
    height: '76%',
    margin: '0',
    padding: '5px 15px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  form: {
    width: '100%',
  },
  buttonsWrapper: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textarea: {
    width: '100%',
    height: '250px',
    border: '1px solid #bdbdbd',
    resize: 'none',
    marginTop: '10px'
  },
  input: {
    border: '1px solid #bdbdbd',
  }
};

export default class EditTask extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {
      task: {
        id: this.props.task.id,
        taskName: this.props.task.taskName,
        description: this.props.task.description,
        isDone: this.props.task.isDone,
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
  }



  render() {
    return(
      <div style={styles.addWrapper}>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <div style={styles.buttonsWrapper}>
            <RaisedButton onClick={this.handleSubmit}
                          primary={true}
                          label="Save changes"
                          style={{marginBottom: '5px'}}/>
            <Link to="/" onClick={() => this.props.onCheckEditMode(null)}>
              <RaisedButton label="Back"
                            style={{marginBottom: '0px'}}/>
            </Link>
          </div>
          <div>
            <TextField
              onChange={this.handleInputChange}
              defaultValue={this.state.task.taskName}
              floatingLabelText="Task name..."
              style={{width: '140px', fontSize: '18px'}}
            />
            <br/>
            <Checkbox
              label="Done"
              checked={this.state.task.isDone}
              onCheck={this.handleCheckboxChange}
              style={{width: '145px'}}
            />
            <textarea
              value={this.state.task.description || ''}
              style={styles.textarea}
              onChange={this.handleTextareaChange}
            />
          </div>
        </form>
      </div>
    );
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onEditTask(this.state.task);
  }

  handleCheckboxChange(){
    let task = {...this.state.task};
    task.isDone = !task.isDone;
    this.setState({task});
  }

  handleInputChange(event){
    let task = {...this.state.task};
    task.taskName = event.target.value;
    this.setState({task});
  }

  handleTextareaChange(event){
    let task = {...this.state.task};
    task.description = event.target.value;
    this.setState({task});
  }
}
