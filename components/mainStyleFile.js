import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#e8eae7',
    padding: "2%",
  },
  topInfo:{
    fontSize: 20,
    color: 'orange',
    fontWeight: 'bold',
  },
   header: {
    fontSize:38,
    backgroundColor:'gray',
    color: 'white',
    width:"100%",
 },
  modalStyle:{
    marginTop: 20,
    marginBottom:130,
  },
  modalButtons:{
    width: '40%',
    height: 60,
    left: '50%',
    backgroundColor: '#388fe7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  curGameStyle:{
    fontSize:40, 
    backgroundColor:'black', 
    color:'white', 
    textAlign:'center',
    flexDirection:'row', 
    justifyContent:'flex-end'
  },
   modalText: {
    fontSize:30,
    color: 'white',
  },
  modalButton:{
    width: 120,
    height: 60,
    left: '50%',
    backgroundColor: '#388fe7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalStyle:{
    marginBottom: 120 ,
    marginTop: 20,
  },
  modalText:{
    fontSize: 22,
    color:'white', 
  },
  teamStyleA: {
    backgroundColor: 'white',
    borderWidth:3,
    width: "45%",
  },
    teamStyleB: {
    position:'absolute',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderWidth:3,
    width: "45%",
  },
  teamAWonStyle:{
    backgroundColor:'gray',
    width:'45%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
  teamBWonStyle:{
    position:'relative',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width:'45%',
    bottom: 50,
    backgroundColor:'red',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
   gameBottonText: {
    fontSize:26,
    width: '40%',
    borderWidth: 5,
    margin: 5,
    backgroundColor:'yellow',
    color:'black',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
}); 