import React, { Component } from 'react';
import { 
  View,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import MainText from '../../components/ui/MainText';
import HeadingText from '../../components/ui/HeadingText';
import { addPlace } from '../../store/actions/index';
  
class SharePlace extends Component {

  static navigatorStyle = {
    navBarButtonColor: "orange"
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      controls: {
        placeName: {
          value: '',
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    }
  }

  onNavigatorEvent = event => {
    if(event.type === "NavBarButtonPress") {
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
    }
  }

  placeNameChangedHandler = value => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value,
            valid: validate(value, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      }
    })
  }

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.image.value

    );
  }
  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation />
          <PlaceInput 
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          /> 
          <View style={styles.button}>
            <Button 
              title="Share the Place!" 
              onPress={this.placeAddedHandler}
              disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.image.valid
              }
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, image) => dispatch(addPlace(placeName, image))
  }
}
export default connect(null, mapDispatchToProps)(SharePlace)
