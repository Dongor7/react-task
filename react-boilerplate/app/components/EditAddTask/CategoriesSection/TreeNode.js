import React from 'react';

export default class TreeNode extends React.PureComponent {

  constructor(props){
    super(props);

    this.state = {
      children: this.props.children,
      child: this.props.node,
    };

    this.toggle = this.toggle.bind(this);
  }

  render() {

    let nodes = null;

    if(this.props.children){
      nodes = this.props.children.map(child => {

        //this.state.child = child;

        if(child.visible)
          return <TreeNode
            key={child.id}
            node={child}
            children={child.children}
            onChangeVisible={child.onChangeVisible}/>;
      })
    }

    return (
      <li>
        <span onClick={() => this.toggle(this.state.child)}>V</span>
        <span>{this.state.child.name}</span>
        <ul>{nodes}</ul>
      </li>
    );
  }

  toggle(node) {

    /*let child = this.state.child;
    child.visible = !child.visible;

    this.setState({child});*/
    //console.log(child);

    this.props.onChangeVisible(node);
  }
}

