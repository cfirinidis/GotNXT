import React, { Component } from 'react'
import { View, Button, Modal, TouchableHighlight, Text} from 'react-native'
import SelectMultiple from 'react-native-select-multiple'
 
// const fruits = ['Apples', 'Oranges', 'Pears']
// --- OR ---
const fruits = [
  { label: 'Apples', value: 'appls' },
  { label: 'Oranges', value: 'orngs' },
  { label: 'Pears', value: 'pears' }
]
 
class App extends Component {
  state = { 
    selectedFruits: [] ,
    modalVisible: false,


  };
 
  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFruits })
  }

  print =()=>{
    console.log("PRINT")
    console.log(this.state.selectedFruits)
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
  render () {
    return (
        <View>
        <Modal 
        visible={this.state.modalVisible}>

      <View>
        <SelectMultiple
          items={fruits}
          selectedItems={this.state.selectedFruits}
          onSelectionsChange={this.onSelectionsChange} />

          <Button onPress={this.print} title="Print"> u</Button>


       <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>



          
      </View>
 </Modal>


 
        <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>

</View>


     


    )
  }
}
export default App