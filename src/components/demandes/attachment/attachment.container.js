import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet, Alert, Platform, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NAVIGATION_TYPE_DEMAND_UPDATE, NAVIGATION_TYPE_DEMAND_CREATE, FILE_TYPE_IMAGE, FILE_TYPE_PDF, FILE_TYPE_POWERPOINT, FILE_TYPE_WORD, FILE_TYPE_EXCEL, FILE_TYPE_JSON, FILE_TYPE_HTML, FILE_TYPE_VIDEO, FILE_TYPE_AUDIO } from '../../../commons/constant';
import {connect} from "react-redux";
import styles from './attachment.style';
var FilePickerManager = require('NativeModules').FilePickerManager;
import {withNavigation} from 'react-navigation'
import AsyncImage from '../../../commons/asyncImage';
import { GRIS_TEXT } from '../../../commons/colors';
import { deleteAttachment, deleteAttachmentReset } from '../../../store/actions/demands.attachment.action';
import Loader from '../../loader/Loader';

class AttachmentContainer extends Component{ 

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

      this.selectedItem = {};

    }

    componentDidMount() {
        
        const {pageType, detailResponse} = this.props;
        if (pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
            let arrvalues = [];

            if (detailResponse && detailResponse.ticket && detailResponse.ticket.attachments.length > 0) {
                
                detailResponse.ticket.attachments.map(attach => {
                    
                    urlSplitted = attach.pj_file.split('/');
                    
                    arrvalue = {
                        key: 'UPDATE',
                        pj_ticket: attach.pj_ticket,
                        pj_url: attach.pj_file,
                        pj_date: attach.pj_date,
                        pj_visibilite: attach.pj_visibilite,
                        pj_icon: attach.pj_icon,
                        index: attach.pj_id,
                        fileName: urlSplitted[urlSplitted.length - 1],
                        type: attach.pj_type,
                        path: null,
                        uri: null

                    };
                    arrvalues.push(arrvalue);

                })
                
            }

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

    componentWillReceiveProps({ response })
    {

        if (response && response !== this.props.response) {
            if (response.code == 200) {
                let newlist = this.state.AttachmentItems.filter(x => x.fileName !== this.selectedItem.fileName)
                if(newlist.length %2 != 0)
                    newlist.push({key: 'EMPTY'}); 
                
                setTimeout(() =>this.setState({AttachmentItems: newlist}), 400);
                
            } else {
                alert("Erreur lors du traitement !")
            }

            this.props.dispatch(deleteAttachmentReset());
        }

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
                    
                    this.addSelectedFile(response); 
                    //essai
                    //this.setState({file: response})
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
                let newlist = this.state.AttachmentItems.filter(x => x.fileName !== item.fileName)
                if(newlist.length %2 != 0)
                    newlist.push({key: 'EMPTY'}); 
                setTimeout(() =>this.setState({AttachmentItems: newlist}), 400);
            }else if(item.key === 'UPDATE'){
                console.log('filename in remove =>', item.fileName);
                this.selectedItem = item;
                this.props.dispatch(deleteAttachment(item.fileName));
            }
        }else{
            Alert.alert(JSON.stringify(item));
        }
        
    }

    getLocalIconMiddleByType = (type) => {
        
        let placeholder = 'file';
        if(type != null){
            if(type.contains('image'))
                placeholder = FILE_TYPE_IMAGE;
            else if(type.contains('pdf'))
                placeholder = FILE_TYPE_PDF;
            else if(type.contains('audio'))
                placeholder = FILE_TYPE_AUDIO;
            else if(type.contains('video'))
                placeholder = FILE_TYPE_VIDEO;
            else if(type.contains('powerpoint') || type.contains('presentationml'))
                placeholder = FILE_TYPE_POWERPOINT;
            else if(type.contains('word'))
                placeholder = FILE_TYPE_WORD;
            else if(type.contains('excel') || type.contains('spreadsheetml'))
                placeholder = FILE_TYPE_EXCEL;
            else if(type.contains('json'))
                placeholder = FILE_TYPE_JSON;
            else if(type.contains('html'))
                placeholder = FILE_TYPE_HTML;
        }
        return placeholder;
    }

    getFileWhenTypeNull = (fileobj) => {

        uriSplitted = fileobj.uri.split('/');
        mFileName = uriSplitted[uriSplitted.length - 1];
        filenameSplitted = mFileName.split('.');
        mExtension = filenameSplitted[filenameSplitted.length - 1];
        let mtype = 'null';
        switch (mExtension) {
            case 'pdf':
                mtype = 'application/pdf'
                break;
            case 'docx':
                mtype = 'application/vnd.openxmlformats-officedocument.wordprocessingml'
                break;
            case 'doc':
                mtype = 'application/msword'
                break;
            case 'xls':
                mtype = 'application/vnd.ms-excel'
                break;
            case 'xlsx':
                mtype = 'application/vnd.openxmlformats-officedocument.spreadsheetml'
                break;
            case 'ppt':
                mtype = 'application/vnd.ms-powerpoint'
                break;
            case 'pptx':
                mtype = 'application/vnd.openxmlformats-officedocument.presentationml'
                break;
            default:
                break;
        }
        mfile = {
            key: 'NEW', 
            index: 0, 
            fileName: mFileName, 
            type: mtype, 
            path: fileobj.path, 
            uri: fileobj.uri, 
            pj_icon: this.getLocalIconMiddleByType(mtype)
        }
        return mfile;

    }

    getUriByKey = (item) => {
        
        let mUri = 'default';
        if(item.key === 'NEW'){
            mUri = item.uri;
        }else if(item.key === 'UPDATE'){
            mUri = `http://${item.pj_url}`;
        }
        return mUri;
    }

    getGridViewItem = (item) => {
  
        let responseJsx = 
            <View style={{height: 115, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                  
                <AsyncImage
                    style={{
                        borderRadius: 0,
                        height: 90, 
                        width: 110,
                        
                    }}
                    source={{
                        uri: this.getUriByKey(item)
                        
                    }}
                    placeholderColor='transparent'
                />
                
                <View style={styles.GridViewBlockStyleInside}>
                    <Icon name={this.getLocalIconMiddleByType(item.type)} style={styles.iconmiddle}/> 
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

        let fileToDisplay = {};
        let arrvalues = [];
        let incrementedIndex = this.state.addedIndex;
        this.state.AttachmentItems.map(attach => {
            if( attach.key){
                if(attach.key !== 'ADD' && attach.key !== 'EMPTY'){
                    arrvalues.push(attach);
                }  
            }

        })
        if(file.type != null){
            fileToDisplay = file;
            arrvalues.push({key: 'NEW', index: incrementedIndex, fileName: file.fileName, type: file.type, path: file.path, uri: file.uri, pj_icon: this.getLocalIconMiddleByType(file.type)});
        }else{
            fileToDisplay = this.getFileWhenTypeNull(file);
            arrvalues.push(this.getFileWhenTypeNull(file));
        }
        arrvalues.push({key: 'ADD'});
        if(arrvalues.length %2 != 0)
            arrvalues.push({key: 'EMPTY'});

        this.setState({
            AttachmentItems: arrvalues,
            addedIndex: incrementedIndex+1,
            file: fileToDisplay
        });

        setTimeout(() => this.props.updateUi('uploads', this.filterNewFile()), 150);
        

    }

    render() {
        const { error, loading } = this.props;
        return (

            <View style={styles.MainContainer}>
 
                {
                    loading && (<Loader loading={loading}/>)
                }

                {
                    error && (alert('Erreur lors du traitement !'))
                }

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

            </View>

        );

    }
 
}

/*
<View  style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
    <Text> {JSON.stringify(this.state.file)} </Text>
</View>
*/

const mapStateToProps = state => ({
    response: state.attachment.response,
    loading: state.attachment.loading,
    error: state.attachment.error,
})
  
export default withNavigation (connect(mapStateToProps)(AttachmentContainer));

