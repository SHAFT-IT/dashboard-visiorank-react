import React from 'react';
import { ListView } from 'react-native';
import MessageItem from './mesage.item.component';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.messages),
      showDetails: false,
      currentMessage: {}
    };
  }

  render() {
    return this.renderList();
  }

  showDetails = (currentMessage) => {
    this.props.navigation.navigate('MessageDetails', { currentMessage });
  };

  renderList = () => {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={item => (<MessageItem item={item} showDetails={this.showDetails}/>)}
      />
    );
  };
}

export default Messages;
