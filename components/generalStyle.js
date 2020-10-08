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
        }

   
  });