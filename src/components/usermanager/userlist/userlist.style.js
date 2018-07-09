export default  {

    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column'
    },

    itemcontainer: {
        flex: 1, 
        flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 1,
        paddingVertical : 10,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        height: 80,
    },

    item: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        backgroundColor: '#DCDCDC',
        flexDirection: 'column',
        paddingVertical: 12,
        marginVertical: 1
    },

    itemtext: {
        marginLeft: 10,
        marginRight: 0,
        fontSize: 13,
        textAlign: 'left',
        color: 'black',
        paddingVertical: 4,
    },

    itemtextright: {
        marginRight: 10,
        fontSize: 13,
        textAlign: 'left',
        color: 'black',
        paddingVertical: 4,
    },

    itemtexthorizontal: {
        flexDirection: 'row',
    },

    errortext: {
        flex: 1,
        color: 'black',
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 15,
    },

    iconright: {
        fontSize: 25,
        color: 'grey'
    },

    iconbottom: {
        fontSize: 55,
        color: 'grey',
        
    },

    containericonbottom: {
        position: 'absolute',
        bottom: 25,
        right: 30,
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60
    }


};