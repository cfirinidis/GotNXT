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

const ListButton = ({onPress, children})=>{
	return(
		<TouchableOpacity onPress={onPress} style={styles.list}>
			<Text style={styles.text}> {children} </Text>
		</TouchableOpacity>	

		)
}


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
	    bottom: 70,
	    alignItems: 'center',
	    justifyContent: 'center',
	  },
  	text:{
    	fontSize:32,
    	color:'grey',
  	}
});

export default ListButton ;