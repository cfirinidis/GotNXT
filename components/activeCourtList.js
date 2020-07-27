import React from 'react';
import{
	Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';
import configureStore from './store';
import firebase from '../elements/Firebase';
import styles from './generalStyle'
import { ScrollView } from 'react-native-gesture-handler';

export default class activeCourtList extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         email: 'filler',
         password: '',
         list: [],
         courtName: this.props.navigation.getParam("courtName", "blank"),
         loading: false,
         lastUpdate: '',
       };
     }

    tempBridge=()=>{
      console.log("Tempbridge ", this.state.courtName)
      this.props.navigation.navigate("Setup", {courtName: this.state.courtName});  
    }

    logOut=()=>{
      this.props.navigation.navigate('Login');
    }


  componentDidMount(){
        let dumb = ''
        let y = []
        console.log("COMPONENT DID MOUNT", this.state.courtName)
        let c = firebase.database().ref('courts/' + this.state.courtName + '/list')
        let update =  firebase.database().ref('courts/' + this.state.courtName + '/updated')
        update.once("value", function(snapshot) {
            console.log("ONNNNNNNNNNNNNNNN",snapshot.val(), snapshot);
              dumb = snapshot.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        })
        c.once('value', snapshot => {
            let x =  snapshot.val()
            for( i in x){
              // console.log("FOR", i, snapshot.val()[i])
              y.push(snapshot.val()[i])
            }
        this.setState({lastUpdate: dumb});
        this.setState({list: y});
       
        });  

    }


  renderCurrentState(){
    let user = firebase.auth().currentUser;
    let handle = user.providerData[0]['displayName']

    if(this.state.loading){
      return(
        <View style={styles.waiting}>
          <ActivityIndicator size='large' color='blue'/>
        </View>
        )
    }
    if(user){
      this.state.email = user.providerData[0]['email']
      console.log(user.providerData)
      return(

      <KeyboardAvoidingView >
        <View >


        <View style={styles.topPart}>
            <View style={styles.info}>
             
              <Text style={styles.infoKey}>
                  EMAIL: 
                  <Text style={styles.infoValue}> { user.providerData[0]['email'] }
                  </Text>
              </Text>
              <Text style={styles.infoKey}>
                HANDLE:
                <Text style={styles.infoValue}> {user.providerData[0]['displayName']} 
                </Text>
              </Text>
      
            </View>

              <View style={styles.logOut}>
                    <TouchableOpacity style={styles.logOutButton} onPress={this.logOut.bind(this)}>
                      <Text style={styles.logOutText}> Log Out  </Text>
                    </TouchableOpacity>
                </View>
          </View>

      <View style={styles.body}>
         <Text style={styles.topBanner}>
            {this.state.courtName}
        </Text>
            
            {this.state.list.map((item, key)=>(
              <Text  key={key} style={styles.listStyle}>
              {key+1} {item}
              </Text>)
            )}

        <Text style={styles.updated}>
            UPDATED : 
        </Text>
        <Text style={styles.updated}>
            {this.state.lastUpdate}
        </Text>
      </View>


      </View>
      </KeyboardAvoidingView>
      )
    }
    else{
      return(
      <Text>NO ACCOUNT Found</Text>
      )
    }
}

render(){
  return(
    <View style={styles.container}>
    <ScrollView>
    
      {this.renderCurrentState()}
    
    </ScrollView>
    </View>
    );
  }
}
  

