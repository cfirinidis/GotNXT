import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import Setup from './Setup'

// ...
type Props = {
    title: string,
    options: string[],
    onSubmit: (selection: string) => void,
    onCancel: () => void
}

type State = {
    selection: string
}

export default class CustomPromptComponent extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selection: null
        };
    }
    // ...
    _onCancelPress = () => this.props.onCancel();

  _onSubmit = () => {

    this._onOptionPressed("Happy");
    console.log("Selection: ", this.state.selection)
    this.props.onSubmit(this.state.selection);}


  _onOptionPressed = (option: string)=> {this.setState({ selection: option })
  
}
    // ...
    _renderOption = (option: string) => {
        const { selection } = this.state;
        console.log("this.state.selection", this.state.selection, "option :",option)
        if (option =="HAPPY"){
        this._onOptionPressed(option)
      }
        const isSelected = selection === option;
        return option
        // ...
    }

    print=()=>{
        console.log("PRINT")
    }
    
    render() {
        return (
            <View>
                <Text style={styles.container}>{this.props.title}</Text>
                <Text style={styles.title}>{this.props.options.map(this._renderOption)} </Text>

                <View>
                
                    <TouchableOpacity onPress={this._onCancelPress}>   
                    <Text style={styles.title}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onSubmitPress}> 
                    <Text> OK </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        color: 'orange',
        backgroundColor:'white'
    },
    title: {
        fontSize: 28,
        color: 'orange',
        backgroundColor:'white'
    }
})


