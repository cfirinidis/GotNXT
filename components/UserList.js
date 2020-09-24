import React from 'react';
import{
	Text,
  View,
  ActivityIndicator,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import configureStore from './store';
import styles from './generalStyle';
import firebase from '../elements/Firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class UserList extends React.Component {
  constructor(props) {
       super(props);
       this.state = {
         email: 'filler',
         password: '',
         list: [],
         courtName: this.props.navigation.getParam("courtName", "blank"),
         loading: false
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
        let c = firebase.database().ref('courts/' + this.state.courtName + '/list')
        return c.once('value', snapshot => {
            let x =  snapshot.val()
            let y = []
            for( i in x){
              y.push(i)
            }
        this.setState({list: y});
        });  
    }


  renderCurrentState(){
    let user = firebase.auth().currentUser;
    x = configureStore.getState().compListReducer
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
            <Text style={styles.courtNameStyle}> Court Name:  {this.state.courtName} </Text>
              {this.state.list.map((item, key)=>(
                  <Text  key={key} style={styles.listStyle}>
                    {key+1} {item}
                  </Text>)
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={this.tempBridge.bind(this)}>
              <Text style={styles.login}> GO TO SETUP  </Text>
            </TouchableOpacity>
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
  
