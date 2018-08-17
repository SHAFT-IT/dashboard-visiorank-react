export default {

  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 1,
    paddingVertical: 10,
    backgroundColor: '#DCDCDC',
    justifyContent: 'space-between',
    alignItems: 'space-between'
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 1,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center'
  },
  itemRight: {
    flexDirection: 'column',
    marginLeft: 0,
    marginRight: 10,
    marginTop: 1,
    width: 50,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center'
  },
  itemtext: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    textAlign: 'left',
    color: 'black'
  },
  itemtextunseen: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold'
  },
  itemtextdate: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 12,
    textAlign: 'left',
    color: '#7d7b7b'
  },
  errortext: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 15
  },
  iconleft: {
    position: 'absolute',
    fontSize: 40,
    color: 'grey'
  }
};
