import React, { Component } from 'react';
import { Alert, FlatList, Platform, TouchableOpacity, View } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncImage from '../../../commons/asyncImage';
import {
  FILE_TYPE_ARCHIVE,
  FILE_TYPE_AUDIO,
  FILE_TYPE_EXCEL,
  FILE_TYPE_HTML,
  FILE_TYPE_IMAGE,
  FILE_TYPE_JSON,
  FILE_TYPE_PDF,
  FILE_TYPE_POWERPOINT,
  FILE_TYPE_VIDEO,
  FILE_TYPE_WORD,
  NAVIGATION_TYPE_DEMAND_CREATE,
  NAVIGATION_TYPE_DEMAND_UPDATE
} from '../../../commons/constant';
import { deleteAttachment, deleteAttachmentReset } from '../../../store/actions/demands.attachment.action';
import Loader from '../../loader/Loader';
import styles from './attachment.style';

const FilePickerManager = require('NativeModules').FilePickerManager;

class AttachmentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GridViewItems: [{ key: 'One' }, { key: 'Two' }],
      AttachmentItems: [],
      file: null,
      addedIndex: 0,
      downloadProgress: false
    };

    this.selectedItem = {};
  }

  componentDidMount() {
    const { pageType, detailResponse } = this.props;
    if (pageType === NAVIGATION_TYPE_DEMAND_UPDATE) {
      let arrvalues = [];

      if (
        detailResponse &&
        detailResponse.ticket &&
        detailResponse.ticket.attachments.length > 0
      ) {
        detailResponse.ticket.attachments.map(attach => {
          let urlSplitted = attach.pj_file.split('/');

          let arrvalue = {
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
        });
      }

      arrvalues.push({ key: 'ADD' });
      if (arrvalues.length % 2 !== 0) arrvalues.push({ key: 'EMPTY' });
      this.setState({
        AttachmentItems: arrvalues
      });
    } else if (pageType === NAVIGATION_TYPE_DEMAND_CREATE) {
      this.setState({
        AttachmentItems: [{ key: 'ADD' }, { key: 'EMPTY' }]
      });
    }
  }

  componentWillReceiveProps({ response }) {
    if (response && response !== this.props.response) {
      if (response.code === 200) {
        let newlist = this.state.AttachmentItems.filter(
          x => x.fileName !== this.selectedItem.fileName
        );
        if (newlist.length % 2 !== 0) newlist.push({ key: 'EMPTY' });

        setTimeout(() => this.setState({ AttachmentItems: newlist }), 400);
      } else {
        alert('Erreur lors du traitement !');
      }

      this.props.dispatch(deleteAttachmentReset());
    }
  }

  //-----------------------DOWNLOAD FILE---------------------------

  download = item => {
    this.setState({ downloadProgress: true });
    let date = new Date();
    let url = `http://${item.pj_url}`;
    let ext = this.extention(url);
    ext = '.' + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'File'
      }
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        this.setState({ downloadProgress: false });
        Alert.alert(
          'Téléchargement terminé',
          'Destination du fichier : ' +
          PictureDir +
          '/' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext
        );
      });
  };

  extention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  //---------------------END DOWNLOAD FILE-------------------------

  filterNewFile = () => {
    let arrvalues = [];
    this.state.AttachmentItems.map(attach => {
      if (attach.key) {
        if (attach.key === 'NEW') {
          arrvalues.push(attach);
        }
      }
    });
    return arrvalues;
  };

  selectFileTapped = () => {
    if (Platform.OS === 'android') {
      const options = {
        title: 'File Picker',
        chooseFileButtonTitle: 'Choose File...'
      };

      FilePickerManager.showFilePicker(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.error) {
          console.log('ImagePickerManager Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.addSelectedFile(response);
          //essai
          //this.setState({file: response})
        }
      });
    } else if (Platform.OS === 'ios') {
      //for ios
    }
  };

  getGridViewAction = item => {
    if (item && item.key) {
      if (item.key === 'ADD') {
        this.selectFileTapped();
      } else if (item.key === 'NEW') {
        let newlist = this.state.AttachmentItems.filter(
          x => x.fileName !== item.fileName
        );
        if (newlist.length % 2 !== 0) newlist.push({ key: 'EMPTY' });
        setTimeout(() => this.setState({ AttachmentItems: newlist }), 400);
      } else if (item.key === 'UPDATE') {
        console.log('filename in remove =>', item.fileName);
        this.selectedItem = item;
        this.props.dispatch(deleteAttachment(item.fileName));
      }
    } else {
      Alert.alert(JSON.stringify(item));
    }
  };

  getLocalIconMiddleByType = type => {
    let placeholder = 'file';
    if (type) {
      if (type.indexOf('image') > -1) placeholder = FILE_TYPE_IMAGE;
      else if (type.indexOf('pdf') > -1) placeholder = FILE_TYPE_PDF;
      else if (type.indexOf('audio') > -1) placeholder = FILE_TYPE_AUDIO;
      else if (type.indexOf('video') > -1) placeholder = FILE_TYPE_VIDEO;
      else if (type.indexOf('powerpoint') > -1 || type.indexOf('presentationml') > -1)
        placeholder = FILE_TYPE_POWERPOINT;
      else if (type.indexOf('word') > -1) placeholder = FILE_TYPE_WORD;
      else if (type.indexOf('excel') > -1 || type.indexOf('spreadsheetml') > -1)
        placeholder = FILE_TYPE_EXCEL;
      else if (type.indexOf('json') > -1) placeholder = FILE_TYPE_JSON;
      else if (type.indexOf('html') > -1) placeholder = FILE_TYPE_HTML;
      else if (type.indexOf('zip') > -1) placeholder = FILE_TYPE_ARCHIVE;
    }
    return placeholder;
  };

  getFileWhenTypeNull = fileobj => {
    let uriSplitted = fileobj.uri.split('/');
    let mFileName = uriSplitted[uriSplitted.length - 1];
    let filenameSplitted = mFileName.split('.');
    let mExtension = filenameSplitted[filenameSplitted.length - 1];
    let mtype = 'null';
    switch (mExtension) {
      case 'pdf':
        mtype = 'application/pdf';
        break;
      case 'docx':
        mtype =
          'application/vnd.openxmlformats-officedocument.wordprocessingml';
        break;
      case 'doc':
        mtype = 'application/msword';
        break;
      case 'xls':
        mtype = 'application/vnd.ms-excel';
        break;
      case 'xlsx':
        mtype = 'application/vnd.openxmlformats-officedocument.spreadsheetml';
        break;
      case 'ppt':
        mtype = 'application/vnd.ms-powerpoint';
        break;
      case 'pptx':
        mtype = 'application/vnd.openxmlformats-officedocument.presentationml';
        break;
      case 'zip':
        mtype = 'application/zip';
        break;
      default:
        break;
    }
    return {
      key: 'NEW',
      index: 0,
      fileName: mFileName,
      type: mtype,
      path: fileobj.path,
      uri: fileobj.uri,
      pj_icon: this.getLocalIconMiddleByType(mtype)
    };
  };

  getSourceByKeyAndType = item => {
    let mSource = undefined;
    if (item && item.type) {
      if (item.type.indexOf('image') > -1) {
        let mUri = null;
        if (item.key === 'NEW') {
          mUri = item.uri;
        } else if (item.key === 'UPDATE') {
          mUri = `http://${item.pj_url}`;
        }
        mSource = { uri: mUri };
      } else {
        mSource = require('../../../assets/images/document.png');
      }
    }
    return mSource;
  };

  getGridViewItem = item => {
    let responseJsx = (
      <TouchableOpacity
        underlayColor="transparent"
        onPress={() => this.download(item)}
      >
        <View
          style={{
            height: 115,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <AsyncImage
            style={{
              borderRadius: 0,
              height: 90,
              width: 110
            }}
            source={this.getSourceByKeyAndType(item)}
            placeholderColor="transparent"
          />

          <View style={styles.GridViewBlockStyleInside}>
            <Icon
              name={this.getLocalIconMiddleByType(item.type)}
              style={styles.iconmiddle}
            />
          </View>

          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => this.getGridViewAction(item)}
            style={{
              position: 'absolute',
              top: 11,
              right: 7,
              width: 28,
              height: 28
            }}
          >
            <Icon name="trash" style={styles.icondelete}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
    if (item && item.key) {
      if (item.key === 'ADD') {
        responseJsx = (
          <TouchableOpacity
            underlayColor="transparent"
            onPress={() => this.getGridViewAction(item)}
            style={styles.GridViewBlockStyle}
          >
            <Icon name="plus" style={styles.iconadd}/>
          </TouchableOpacity>
        );
      } else if (item.key === 'EMPTY') {
        responseJsx = (
          <View style={{ flex: 1, backgroundColor: 'transparent' }}/>
        );
      }
    }

    return responseJsx;
  };

  addSelectedFile = file => {
    let fileToDisplay = {};
    let arrvalues = [];
    let incrementedIndex = this.state.addedIndex;
    this.state.AttachmentItems.map(attach => {
      if (attach.key) {
        if (attach.key !== 'ADD' && attach.key !== 'EMPTY') {
          arrvalues.push(attach);
        }
      }
    });
    if (file.type != null) {
      fileToDisplay = file;
      arrvalues.push({
        key: 'NEW',
        index: incrementedIndex,
        fileName: file.fileName,
        type: file.type,
        path: file.path,
        uri: file.uri,
        pj_icon: this.getLocalIconMiddleByType(file.type)
      });
    } else {
      fileToDisplay = this.getFileWhenTypeNull(file);
      arrvalues.push(this.getFileWhenTypeNull(file));
    }
    arrvalues.push({ key: 'ADD' });
    if (arrvalues.length % 2 != 0) arrvalues.push({ key: 'EMPTY' });

    this.setState({
      AttachmentItems: arrvalues,
      addedIndex: incrementedIndex + 1,
      file: fileToDisplay
    });

    setTimeout(() => this.props.updateUi('uploads', this.filterNewFile()), 150);
  };

  render() {
    const { error, loading } = this.props;
    return (
      <View style={styles.MainContainer}>
        {loading && <Loader loading={loading}/>}

        {error && alert('Erreur lors du traitement !')}

        {this.state.downloadProgress && (
          <Loader loading={this.state.downloadProgress}/>
        )}

        <FlatList
          data={this.state.AttachmentItems}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>{this.getGridViewItem(item)}</View>
          )}
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
  error: state.attachment.error
});

export default withNavigation(connect(mapStateToProps)(AttachmentContainer));
