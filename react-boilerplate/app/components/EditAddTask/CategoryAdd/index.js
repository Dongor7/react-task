import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
  addWrapper: {
    width: '50%',
    height: '10%',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};

export default class CategoryAdd extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {
      category: {
        id: '',
        name: '',
        children: [],
        visible: true,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} style={styles.addWrapper}>
        <TextField
          value={this.state.category.name}
          onChange={this.handleChange}
          floatingLabelText="Category name..."
          style={{width: '140px', marginBottom: '23px', fontSize: '18px'}}
        />
        <RaisedButton onClick={this.handleSubmit}
                      label="Add"
                      style={{marginBottom: '5px'}}/>
      </form>
    );
  }

  handleChange(event){

    let category = {...this.state.category};
    category.name = event.target.value;
    category.id = this.props.nextId;

    this.setState({category});
  }

  handleSubmit(){

    if(this.state.category.name) {
      this.props.onAddCategory(this.state.category);
    }

    this.setState(prevState => {
      return {
        category: {
          id: '',
          name: '',
          children: [],
          visible: true,
        }
      }
    })
  }

}
