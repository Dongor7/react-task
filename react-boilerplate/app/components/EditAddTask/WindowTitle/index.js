import React from 'react';

const style = {
  width: '100%',
  margin: '0',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '15px',
};

export default class TaskEdit extends React.PureComponent {

  constructor(props){
    super(props);
  }

  render() {
    return(
      <h1 style={style}>{this.props.title}</h1>
    );
  }

}
