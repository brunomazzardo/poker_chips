//@flow
import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import CardView from "./CardView";



class CardButton extends React.Component<> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static defaultProps = {
    onPress: () => {}
  };

  _renderButtonContent = () => {
    if (this.props.text)
      return (
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.text}
        </Text>
      );
    else return this.props.children;
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <CardView style={[styles.cardView, this.props.viewStyle]}>
          {this._renderButtonContent()}
        </CardView>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    paddingVertical: 8,
    alignItems: "center"
  },
  text: {
    fontSize: 24,
  }
});

export default CardButton;
