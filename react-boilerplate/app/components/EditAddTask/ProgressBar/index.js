import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

const style = {
  height: '8px',
};

export default class TaskEdit extends React.PureComponent {

  constructor(props){
    super(props);
  }



  render() {
    return(
      <LinearProgress style={style} mode="determinate" value={this.props.completed} />
    );
  }

}
