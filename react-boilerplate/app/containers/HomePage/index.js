import React from 'react';
import App from 'components/EditAddTask/index';
import { Route } from 'react-router-dom';


const styles = {
  todoWrapper: {
    width: '400px',
    height: '800px',
    border: '1px solid grey',
    margin: '20px auto',
    display: 'flex',
    justifyContent: 'center',
    padding: '15px'
  },
};

export default class HomePage extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {
    }
  };

  render() {
    return (
      <Route component={App} />
    );
  }
}
