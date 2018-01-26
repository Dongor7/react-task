import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
  searchWrapper: {
    width: '80%',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  searchInput: {
    border: '1px solid black',
    marginLeft: '15px',
    width: '100px',
  },
  searchClear: {
    border: '1px solid black',
    borderLeft: 'none',
  },
};

export default class TaskEdit extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {
      isDone: false,
      taskName: '',
    };

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} style={styles.searchWrapper}>
        <Checkbox
          label="Show done"
          checked={this.state.isDone}
          onCheck={this.handleCheckboxChange}
          style={{width: '145px'}}
        />
        <TextField
          value={this.state.taskName}
          onChange={this.handleInputChange}
          floatingLabelText="Search..."
          style={{width: '140px', marginBottom: '23px', fontSize: '18px'}}
        />
        <RaisedButton onClick={this.handleSubmit}
                      label="Search"
                      style={{marginBottom: '0px'}}/>
      </form>
    );
  }

  handleCheckboxChange(){
    this.setState((prevState) => ({
      isDone: !prevState.isDone,
    }))
  }

  handleInputChange(event){
    this.setState({taskName: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onGetSearchParameters(this.state);
  }
}
