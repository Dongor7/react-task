import React from 'react';
import { Route} from 'react-router-dom';

import Title from '../WindowTitle/index';
import Search from '../SearchBox/index';

const style = {
  width: '100%',
  height: '10%',
  margin: '0',
  display: 'flex',
  alignItems: 'center',
  paddingRight: '15px',
};

export default class SearchTitle extends React.PureComponent {

  constructor(props){
    super(props);
  }

  render() {
    return(
      <div style={style}>
        <Route render={(props) => (
          <Title title={this.props.title}/>
        )} />
        <Route exact path='/' render={(props) => (
          <Search onGetSearchParameters={this.props.onGetSearchParameters} />
        )} />
      </div>
    );
  }

}
