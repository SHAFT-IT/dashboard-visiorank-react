import React, { Component } from 'react'
import { Text, View, FlatList, TouchableHighlight, ListView } from 'react-native';
import styles from './userlist.style';
import { fetchUsers } from '../../../store/actions/users.action';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserListContainer extends Component{

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers());
    }

    render() {
        const { error, loading, users } = this.props;
        
        if (error) {
            console.log("This is ERROR");
            return (
                <View style={styles.container}>
                    <Text style={styles.errortext}>Error calling ws! {error.message}</Text>
                </View>
            );
        }
    
        //console.log('IN CONTAINER');
        //console.log(users);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(users),
        };

        return (
            
            <View style={styles.container}>
                
                {loading ? 
                    <Loader loading={loading} /> : 
                    <ListView 
                        dataSource={this.state.dataSource} 
                        renderRow={
                            (item) => (
                                <MessageItem item={item}/>
                            )
                        } 
                    />
                }
            </View>
          
        );
      }

}

const mapStateToProps = state => ({
    users: state.users.items,
    loading: state.users.loading,
    error: state.users.error
});
  
/*const mapDispatchToProps = (dispatch) => {
    return{
        fetchUsers:dispatch(fetchUsers())
    } 
}*/

const MessageItem = ({item}) => {
    
    let swipeBtns = [
        {
            text: <Icon name="eye" style={styles.iconright}/>,
            backgroundColor: '#f5f5f5',
            underlayColor: '#ffffff',
            onPress: () => { }
        },
        {
            text: <Icon name="trash" style={styles.iconright}/>,
            backgroundColor: '#f9f9f9',
            underlayColor: '#ffffff',
            onPress: () => { }
        }
    ];

    return (
        <Swipeout right={swipeBtns} autoClose='true' backgroundColor= 'transparent'>
            <TouchableHighlight underlayColor='#ffffff'>
                <View style={styles.item}>
                    <Text style={styles.itemtext}>{item.nom} {item.prenom}</Text>
                    <Text style={styles.itemtext}>{item.societe || '......'} </Text>
                    <Text style={styles.itemtext}>{item.telephone || '......'} </Text>
                    <Text style={styles.itemtext}>{item.email} </Text>
                </View>
            </TouchableHighlight>
        </Swipeout>

    )
}

export default connect(mapStateToProps)(UserListContainer);

/*

{users.map(user =>
              <li key={user.id}>{user.title}</li>
            )}

<View style={styles.container}>
    {loading ? 
        <Loader loading={loading} /> : 
        <FlatList
            data={users}
            renderItem = 
            {({item}) => 

                <View style={styles.item}>
                    <Text style={styles.itemtext}>{item.nom} {item.prenom}</Text>
                    <Text style={styles.itemtext}>{item.societe} </Text>
                    <Text style={styles.itemtext}>{item.telephone} </Text>
                    <Text style={styles.itemtext}>{item.email} </Text>
                </View>

            }
        />
    }
</View>            
*/