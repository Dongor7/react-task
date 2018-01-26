import React from 'react';
import TreeNode from './TreeNode';

const styles = {
  wrapper: {
    border: '1px solid #bdbdbd',
    width: '34%',
    height: '76%',
    margin: '0 7px 0 0',
    display: 'flex',
    overflowY: 'scroll',
  },
};

export default class TreeView extends React.PureComponent {

  constructor(props){
    super(props);

    this.state ={

    }
  }

  render() {

    let self = this;

    let categories = this.props.categories;

    let nodes = null;
    if(categories) {
      nodes = categories.map(function(category){
        return <TreeNode key={category.id}
                         node={category}
                         children={category.children}
                         onChangeVisible={self.props.onChangeVisible} />
      });
    }

    return(
      <div style={styles.wrapper}>
        <ul>
          {nodes}
        </ul>
      </div>
    );
  }

}
