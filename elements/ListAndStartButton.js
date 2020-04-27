import React from 'react';
import{
	StyleSheet,
	Text,
	Alert,
	View,
	Button,
	TextInput,
	TouchableOpacity,
} from 'react-native';

const ListAndStartButton = ({StartMethod, GoToListMethod})=>{
	return(
		<View >
			<TouchableOpacity onPress={GoToListMethod} style={styles.list}>
				<Text style={styles.text}> LIST </Text>
			</TouchableOpacity>	
			<TouchableOpacity onPress={StartMethod} style={styles.button}>
				<Text style={styles.text}> START </Text>
			</TouchableOpacity>
		</View>
)}


const styles = StyleSheet.create({
	list: {
    	backgroundColor: 'white',
	    width: '35%',
	    alignSelf: 'flex-end',
	    borderWidth: 3,
	    borderColor: '#ff8c1d',
	    flexDirection: 'row-reverse',
	    borderRadius: 50,
	    height: 50,
	    alignItems: 'center',
	    justifyContent: 'center',
	    position:'relative'
	  },
	  button: {
    	backgroundColor: '#AFFAAB',
	    width: '35%',
	    alignSelf: 'flex-end',
	    borderWidth: 3,
	    borderColor: '#ff8c1d',
	    flexDirection: 'row-reverse',
	    borderRadius: 50,
	    height: 50,
	     top:10,
	    alignItems: 'center',
	    justifyContent: 'center',
	  	position:'relative'
	  },
  	text:{
    	fontSize:32,
    	color:'grey',
  	}
});

export default ListAndStartButton ;

