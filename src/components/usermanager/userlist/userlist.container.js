import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native';
import styles from './userlist.style';
import { fetchUsers } from '../../../store/actions/users.action';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';

class UserListContainer extends Component{

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

        return (
            
            <View style={styles.container}>

                {loading ? 
                    <Loader loading={loading} /> : 
                    <FlatList
                        data={users}
                        renderItem = 
                        {({item}) => 
    
                            <View style={styles.item}>
                                <Text style={styles.itemtext}>{item.nom} {item.prenom}</Text>
                            </View>
    
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

export default connect(mapStateToProps)(UserListContainer);

/*

{users.map(user =>
              <li key={user.id}>{user.title}</li>
            )}

<View style={styles.container}>
                <FlatList
                    data={[
                        {key: 'Devin'},
                        {key: 'Jackson'},
                        {key: 'James'},
                        {key: 'Joel'},
                        {key: 'John'},
                        {key: 'Jillian'},
                        {key: 'Jimmy'},
                        {key: 'Julie'},
                    ]}
                    renderItem = 
                    {({item}) => 

                        <View style={styles.item}>
                            <Text style={styles.itemtext}>{item.key}</Text>
                        </View>

                    }
                />
            </View>
            
            */