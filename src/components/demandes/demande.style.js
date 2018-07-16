import {Dimensions} from 'react-native'

export default  {

    parent: {
        flexDirection: 'column',
        backgroundColor: '#222',
    },

    logo: {
        marginLeft: 30
    },

    headercontainerone: {
        height: 40,
        justifyContent: 'center',
    },

    headercontainertwo: {
        height: 20,
        flexDirection: 'row',
    },

    headertextwhite: {
        marginLeft: 35,
        color: 'white',
        fontSize: 14,
        textAlign: "left",
        textAlignVertical: "center"
    },

    headertextorange: {
        marginLeft: 5,
        color: 'orange',
        textAlign: "left",
        textAlignVertical: "center",
        fontSize: 14,
    },

    touchableright: {    
        position: 'absolute',  
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 35

    },

    iconright: {
        fontSize: 19,
        color: '#ffffff'
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      ratingImage: {
        height: 100,
        width: 100
      },
      ratingText: {
        paddingLeft: 10,
        color: 'grey'
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      },
      title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20
      },
      header: {
        backgroundColor: '#DCDCDC',
        padding: 10, 
        flex:1, 
        flexDirection: 'column'
      },
      headerText: {
        textAlign: 'left',
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '500'
      },
      content: {
        padding: 20,
        backgroundColor: '#fff'
      },
      active: {
        backgroundColor: 'rgba(255,255,255,1)'
      },
      inactive: {
        backgroundColor: 'rgba(245,252,255,1)'
      },
      selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center'
      },
      selector: {
        backgroundColor: '#DCDCDC',
        padding: 10
      },
      activeSelector: {
        fontWeight: 'bold'
      },
      selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10
      },
      buttonSubmit: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 1,
        height: 25,
        borderRadius: 3,
        width: 100,
        padding: 5,
        backgroundColor: 'green',
        alignItems: "center",
        justifyContent: "center",
      },
      bsubmit1: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 1,
        height: 25,
        borderRadius: 3,
        width: 100,
        padding: 5,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        fontSize: 11,
        textAlign: 'center',
      },
      containerItemDevider:{
        margin : 0,
        height: 2,
        backgroundColor: "#b9b9b9",
        color: "#b9b9b9"
      },
      buttonHeader:{
          flex:1,
          flexDirection: 'row',
      },
      contentList : {
        textAlign: 'left',
        marginLeft: 5,
        fontSize: 11,
        fontWeight: '500'
      },
      iconItemLeft: {
        marginLeft: 25,
        fontSize: 15,
        color: '#ffffff',
        width: 19
      },
      buttonContent1:{
        justifyContent: 'center',
        alignItems: 'center',
        width:(Dimensions.get('window').width / 2)-2, 
        height: 20,
        backgroundColor: '#DCDCDC',
        margin:2 
    },
    buttonContent2:{
        justifyContent: 'center',
        alignItems: 'center',
        width: (Dimensions.get('window').width / 2)-2, 
        height: 20,
        backgroundColor: '#DCDCDC',
        margin:2 
    },
    buttonContentHeader: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 0, 
        justifyContent: 'space-around',
        alignItems: 'center'
    },
};