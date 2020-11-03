import { StyleSheet } from 'react-native';
export default StyleSheet.create({



        addNewText:{
            fontSize: 18,
            textAlign: "center",
            justifyContent: 'center',
            color: 'black',

            // alignSelf: 'flex-end',
          },
          addNewCourt:{
            width: '40%',
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center', 
          },
          addNewButton:{
            backgroundColor:'orange',
            width:"60%",
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 6,
            borderColor:'black',
            borderRadius: 50,
            marginVertical: 25,
          },
          banner:{
            // width: "75%",
            // left: '12.5%',
            fontSize:24, 
            // marginTop: 12,
            textAlign:'center', 
            backgroundColor:'white',
            justifyContent: 'center',
            alignItems: 'center',
          },
          body:{
            marginTop: 15,
            backgroundColor: '#1c313a',
            width: "75%",
            left: '12.5%',
            fontSize:24,
            marginBottom: 10, 
          },
        button: {
            backgroundColor:'#1c313a',
            borderRadius: 50,
            width: "75%",
            marginVertical: 10,
            paddingVertical: 13,
            justifyContent: 'center',
            alignItems: 'center',
            left:"12%", 
          },
          
        buttonText: {
            fontSize:18,
            fontWeight:'500',
            color:'white',
            textAlign:'center'
          },
          container : {
            flex: 1,
            justifyContent:'center',
            backgroundColor:'gray',
            width: "100%"
          },

        
        containerNoTop : {
            flex: 1,
            // marginTop: 15,
            justifyContent:'center',
            paddingTop: 25,
            backgroundColor:'gray',
            width: "100%"
        },
        courtNameStyle:{
            fontSize:24,
            textAlign:"left",
            color:'black',
            backgroundColor:'white',
            // width:"50%"
          },
        info:{
            backgroundColor: 'lightgray',
            width: '60%',
            fontSize: 46,
            // justifyContent: 'left',
            textAlign: 'left',
        },
        infoKey:{
            fontSize:16,
            color:'orange',
        },
          infoValue:{
            fontSize:16,
            color:'black',
          },
        listStyle:{
            width:'100%',
            fontSize:20,
            marginBottom: 10,
            color: 'yellow',
            justifyContent: 'center',
            marginLeft : '20%',
          },   
        login:{
            fontSize:20,
            textAlign:"center",
            color:'white',
          },

// logout button
        
          logOutText:{
            fontSize: 18,
            textAlign: "center",
            color: 'red',
           
          },
          logOut:{
            width: '40%',
            backgroundColor: 'gray',
            justifyContent: 'center',
            alignItems: 'center',

          },
          logOutButton:{
            backgroundColor:'pink',
            width: "80%",

            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 6,
            borderColor:'black',
            borderRadius: 50,
          },

//  main menu button 

mainMenuText:{
  fontSize: 18,
  textAlign: "center",
  color: 'red',
 
},
mainMenu:{
  width: '40%',
  // backgroundColor: 'gray',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf:'flex-end',
  position:'absolute',
  padding:'4%',
},
mainMenuButton:{
  backgroundColor:'pink',
  width: "80%",

  height: 45,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 6,
  borderColor:'black',
  borderRadius: 50,
},




        managedList:{
            fontSize:24,
            marginBottom: 10,
            color: 'orange',
            marginLeft:15, 
        },
        signUp:{
            backgroundColor:'orange',
            width:"40%",
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 6,
            borderColor:'#1c313a',
            borderRadius: 50,
            left: '30%',
            marginVertical: 25,
          },
        text:{
          fontSize:24,
          textAlign:"left",
          color:'orange',
        },

          textOrange:{
            fontSize:24,
            textAlign:"left",
            color:'orange',
          },
          textWhite:{
            fontSize:32,
            textAlign:"center",
            color:'white',
          },
          title:{
            fontSize:32,
            fontWeight: 'bold',
            textAlign:"center",
            color:'orange',
          },
          topBanner:{
        
            fontSize:24, 
            textAlign:'center', 
            backgroundColor:'white'

          },
          topPart:{
            flexDirection: 'row',

            //  justifyContent: 'flex-end',
          },
          updated:{
            color:'orange',
            fontSize: 22, 
          },
        waiting : {
          justifyContent:'center',
          backgroundColor:'yellow',
        },





          wrapper: {
            flex: 1,
            backgroundColor: '#e8eae7',
            paddingTop: 10,
            paddingLeft: 5,
            paddingRight: 5,
            width: '100%',
            height: '100%',
          },
          titleSetup: {
            fontSize: 40,
            paddingTop:18,
            marginBottom: 10,
            color: 'gray',
            fontWeight: 'bold',
            textAlign:'center',
          },
          footer:{
            fontSize:14,
            position:'absolute',
            textAlign:'center',
            top: "100%",
            width:"100%",
          },
          textInput: {
            padding: 18,
            marginBottom: 10,
            fontSize: 24,
            color: "red",
            backgroundColor: '#e8eae7',
            textAlign:"center"
          },
          text: {
            fontSize:28,
            color: "black",
            fontWeight:'bold',
            textAlign:"center",
            // justifyContent: 'center',
            // alignItems:'center',
          },
          info:{
            backgroundColor: 'lightgray',
            width: '100%',
          },
          textBox:{
            fontSize:24,
            textAlign:"left",
            color:'orange',
          },
          resetButton: {
            fontSize: 26,
            justifyContent: 'center',
            backgroundColor: '#ffe6e4',
            alignItems: 'center',
            borderColor: 'red',
            borderWidth: 4,
            borderRadius: 50,
            marginVertical: 12,
            width: "45%",
            height: 60,
          },
           doneButton: {
            fontSize: 26,
            justifyContent: 'center',
            backgroundColor: '#e8ffdd',
            borderColor: '#51ff00',
            borderWidth: 4,
            alignItems: 'center',
            borderRadius: 50,
            marginVertical: 12,
            width: "45%",
            height: 60,
          },
           loadButton: {
            fontSize: 26,
            justifyContent: 'center',
            borderRadius: 50,
            alignItems: 'center',
            backgroundColor: '#fff2d3',
            borderColor: '#ffd800',
            borderWidth: 4,
            marginVertical: 12,
            width: "45%",
            height: 60,
          },
            modalStyle:{
            marginTop: 20,
            marginBottom:130,
          },
          modalButtons:{
            width: '40%',
            height: 60,
            left: '50%',
            backgroundColor: 'pink',
            justifyContent: 'center',
            alignItems: 'center',
          },
           modalText: {
            fontSize:30,
            color: 'black',
          }

   
  });