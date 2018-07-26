import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet, Alert, Platform, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NAVIGATION_TYPE_DEMAND_UPDATE, NAVIGATION_TYPE_DEMAND_CREATE } from '../../../commons/constant';
import { GRIS_BACKGROUND, GRIS_TEXT } from '../../../commons/colors';
import styles from './attachment.style';
var FilePickerManager = require('NativeModules').FilePickerManager;

export default class AttachmentContainer extends Component{ 

    constructor(props)
    {
      super(props);
      this.state = { 
        GridViewItems: [
            {key: 'One'},
            {key: 'Two'},
        ],
        AttachmentItems: [],
        file: null,
        addedIndex: 0
      }
    }

    componentDidMount() {
        
        this.init()
        
    }

    filterNewFile = () => {

        let arrvalues = [];
        this.state.AttachmentItems.map(attach => {
            if( attach.key){
                if(attach.key === 'NEW'){
                    arrvalues.push(attach);
                }  
            }
        })
        return arrvalues;

    }

    selectFileTapped = () => {

        if (Platform.OS === 'android') {
            const options = {
                title: 'File Picker',
                chooseFileButtonTitle: 'Choose File...'
            };
        
            FilePickerManager.showFilePicker(options, (response) => {
                console.log('Response = ', response);
        
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                }
                else if (response.error) {
                    console.log('ImagePickerManager Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    this.setState({
                        file: response
                    });
                    this.addSelectedFile(response); 

                }
            });
      
        }else if (Platform.OS === 'ios') {
            //for ios
        }

    }

    getGridViewAction = (item) => {
  
        if(item && item.key){  
            if(item.key === 'ADD'){
                this.selectFileTapped();
            }else if(item.key === 'NEW'){
                let newlist = this.state.AttachmentItems.filter(x => x.index !== item.index)
                if(newlist.length %2 != 0)
                    newlist.push({key: 'EMPTY'}); 
                setTimeout(() =>this.setState({AttachmentItems: newlist}), 400);
            }
        }else{
            Alert.alert(JSON.stringify(item));
        }
        
    }

    getGridViewItem = (item) => {
  
        let responseJsx = 
            <View style={{flex: 1, height: 100, backgroundColor: 'transparent'}}>
                        
                <View style={styles.GridViewBlockStyleInside}>
                    <Text style={styles.GridViewInsideTextItemStyle}> {item.fileName} </Text>
                </View>
                <TouchableOpacity underlayColor='transparent' onPress={() => this.getGridViewAction(item)} style={{position: 'absolute', top:11, right:7, width:28, height: 28}}>
                    <Icon name="trash" style={styles.icondelete}/> 
                </TouchableOpacity>
            </View>;
        if(item && item.key){
            
            if(item.key === 'ADD'){
                responseJsx = 
                <TouchableOpacity underlayColor='transparent' onPress={() => this.getGridViewAction(item)} style={styles.GridViewBlockStyle}>
                    <Icon name="plus" style={styles.iconadd}/>   
                </TouchableOpacity>;
            }else if(item.key === 'EMPTY'){
                responseJsx = 
                <View style={{flex: 1, backgroundColor: 'transparent'}}>
                </View>;
            }
        
        }

        return responseJsx;
        
    }

    addSelectedFile = (file) => {

        let arrvalues = [];
        let incrementedIndex = this.state.addedIndex;
        this.state.AttachmentItems.map(attach => {
            if( attach.key){
                if(attach.key !== 'ADD' && attach.key !== 'EMPTY'){
                    arrvalues.push(attach);
                }  
            }

        })
        arrvalues.push({key: 'NEW', index: incrementedIndex, fileName: file.fileName, type: file.type, path: file.path, uri: file.uri});
        arrvalues.push({key: 'ADD'});
        if(arrvalues.length %2 != 0)
            arrvalues.push({key: 'EMPTY'});

        this.setState({
            AttachmentItems: arrvalues,
            addedIndex: incrementedIndex+1,
        });

        setTimeout(() => this.props.updateUi('uploads', this.filterNewFile()), 150);
        

    }

    init = () => {
        const {pageType} = this.props;
        if (pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
            let arrvalues = [];
            arrvalues.push({key: 'ADD'});
            if(arrvalues.length %2 != 0)
                arrvalues.push({key: 'EMPTY'});
            this.setState({
                AttachmentItems: arrvalues,
            });
        } else if (pageType === NAVIGATION_TYPE_DEMAND_CREATE){
            
            this.setState({
                AttachmentItems: [{key: 'ADD'}, {key: 'EMPTY'}],
            });
        }
    }

    render() {

        return (

            <View style={styles.MainContainer}>
 
                <FlatList
                
                    data={ this.state.AttachmentItems }
            
                    renderItem={({item}) =>
                    
                    <View style={{flex: 1}}>
                        
                        {
                            this.getGridViewItem(item)
                        }
                        
                    </View>

                    }

                    numColumns={2}
                />

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                    {this.state.file && typeof this.state.file === 'object' ? 
                        <Text>{JSON.stringify(this.state.file)}</Text> :
                        <Text>Your file detail appear here</Text> 
                    }
                     
                </View>

   
            </View>

        );

    }
 
}
