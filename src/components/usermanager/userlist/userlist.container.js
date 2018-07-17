import React, { Component } from 'react'
import { Text, View, TouchableHighlight, ListView, Linking, Alert } from 'react-native';
import styles from './userlist.style';
import { fetchUsers } from '../../../store/actions/users.action';
import { connect } from "react-redux";
import Loader from '../../loader/Loader';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { bgColor } from '../../../commons/colors';
import LoaderDelete from '../../loader/LoaderDelete';
import { AlertError } from '../../alert/AlertError';
import { deleteUser } from '../../../store/actions/userdelete.action';
import { NAVIGATION_TYPE_USER_UPDATE, NAVIGATION_TYPE_USER_CREATE } from '../../../commons/constant';
 
class UserListContainer extends Component{

    updateData  = () => {
        
        this.props.dispatch(fetchUsers());

    };

    showPopupConfirm = (user) => {

        Alert.alert(
            '',
            'Etes-vous sur de vouloir supprimer cet utilisateur ?',
            [
              {text: 'Annuler', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.props.dispatch(deleteUser(user.id))},
            ],
            { cancelable: false }
        )
        //console.log('USER TO DELETE =>', user.id)
    }

    goToCreateUser = () => {
        
        this.props.navigation.navigate('UserCreate', {user: {}, pagetype: NAVIGATION_TYPE_USER_CREATE, updateData:this.updateData});
    }

    goToEditUser = (user) => {
        
        this.props.navigation.navigate('UserCreate', {user: user, pagetype: NAVIGATION_TYPE_USER_UPDATE, updateData:this.updateData});
    }

    onSwipeOpen = (isOpen) => {

        if(isOpen)
            console.log('ON SWIPE OPEN')
        else
            console.log('ON SWIPE CLOSE')

    }

    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    constructor(props) {
        super(props);
        
        this.state = {
            selectedUser: {}, 
        }

    }

    componentDidMount() {
        console.log('PROPS NAVIGATION UserListContainer=>', this.props.navigation);
        this.props.dispatch(fetchUsers());
    }

    componentWillReceiveProps ({ response }) {   
        console.log("DELETE 1 ==>", response);
        if (response && response !== this.props.response) {  
            console.log("DELETE 2"); 
            if(response.code == 200){
                console.log("DELETE 3");
                this.props.dispatch(fetchUsers());
            }else{
                AlertError('Erreur lors de la suppression') 
            }
        }
    }

    render() {
        const { error, loading, users, loadingdelete, errordelete } = this.props;
        
        if (error) {
            console.log("This is ERROR");
            return (
                <View style={styles.container}>
                    <Text style={styles.errortext}>Error calling ws! {error}</Text>
                </View>
            );
        }
    
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(users),
        };

        return (
            
            <View style={styles.container}>
                
                {loading ? 
                    <Loader loading={loading} /> : 

                    <View>

                        {/*errordelete && (
                            <AlertError textErrorValue='Erreur lors de la suppression !' />
                        )*/}

                        {loadingdelete && (
                            <LoaderDelete loading={loadingdelete} textvalue='Supression...' />
                        )}

                        <ListView 
                            dataSource={this.state.dataSource} 
                            onChangeVisibleRows={() => this.onSwipeOpen(false)}
                            renderRow={
                                (item) => (
                                    <UserItem item={item} showPopupConfirm={this.showPopupConfirm} goToEditUser={this.goToEditUser} onSwipeOpen={this.onSwipeOpen} />
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
    error: state.users.error,
    response: state.userdelete.response,
    loadingdelete: state.userdelete.loading,
    errordelete: state.userdelete.error,
});
  

const UserItem = ({item, showPopupConfirm, goToEditUser, onSwipeOpen}) => {

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
            onPress: () => goToEditUser(item)
        },
        {
            text: <Icon name="trash" style={styles.iconright}/>,
            backgroundColor: '#f9f9f9',
            underlayColor: '#ffffff',
            onPress: () => showPopupConfirm(item)
        }
    ];

    return (
        <Swipeout right={swipeBtns} autoClose='true' backgroundColor= 'transparent' onOpen={() => onSwipeOpen(true)} onClose={() => onSwipeOpen(false)}>
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

