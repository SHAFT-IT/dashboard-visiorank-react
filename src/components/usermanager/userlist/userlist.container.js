import React, { Component } from 'react'
import { Text, View, TouchableHighlight, ListView,Linking } from 'react-native';
import styles from './userlist.style';
import { fetchUsers } from '../../../store/actions/users.action';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bgColor } from '../../../commons/colors';

class UserListContainer extends Component{

    goToCreateUser = () => {
        console.log('HERE NOW GO');
        this.props.navigation.navigate('UserCreate');
    }

    navigateToScreen = (route) => () => {
        
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
       
    }

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

                    <View>

                        <ListView 
                            dataSource={this.state.dataSource} 
                            renderRow={
                                (item) => (
                                    <UserItem item={item}/>
                                )
                            } 
                        />

                        
                        <TouchableHighlight style={styles.containericonbottom}
                            underlayColor='transparent'
                            onPress={() => this.goToCreateUser()}>
                            
                            <Icon name="plus-circle" style={styles.iconbottom}/>
                            
                        </TouchableHighlight>
                    
                    </View>
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
  
/*
this.navigateToScreen('UserCreate')
<TouchableHighlight
                            underlayColor='transparent'
                            onPress={this.props.navigation.navigate('Message')}>

                            </TouchableHighlight>

const mapDispatchToProps = (dispatch) => {
    return{
        fetchUsers:dispatch(fetchUsers())
    } 
}*/

const UserItem = ({item}) => {

    let lettre = "A";
    let backgroundColor = bgColor("A");
    if(item.societe){
        lettre = item.societe.charAt(0).toUpperCase();
        backgroundColor = bgColor(lettre);
    }

    let swipeBtns = [
        {
            text: <Icon name="edit" style={styles.iconright}/>,
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
                <View style={styles.itemcontainer}>
                    <View style={{width: 52}}>
                        <Text style={{  width: 35, marginLeft:14, height: 35, borderRadius: 40 / 2, color:"#fbecc9", backgroundColor: backgroundColor, textAlign:'center', fontSize: 25/*, fontWeight:'bold'*/}}>{lettre}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemtext}> {item.societe ? `${item.societe} - ` : ''} {item.nom} {item.prenom} </Text>
                        <View style={styles.itemtexthorizontal}>
                            <Text style={styles.itemtext} onPress={()=> Linking.openURL(`tel:+${item.telephone}`)}>{item.telephone ? `${item.telephone} - ` : ''}</Text>
                            <Text style={styles.itemtextright} onPress={() => Linking.openURL('mailto:mailto@deniseleeyohn.com?subject=abcdefg&body=body')}> {item.email} </Text>
                        </View>
                    </View>
                </View>    
            </TouchableHighlight>
        </Swipeout>

    )
}

UserListContainer.propTypes = {
    navigation: PropTypes.object
};

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