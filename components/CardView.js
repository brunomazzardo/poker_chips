//@flow

import * as React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

type Props = {
  style?: StyleSheet.Styles,
  children?: React.Node,
  index?: number,
  onPress?: Function
};

type State = {};

class CardView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const compositeStyles = [styles.card, this.props.style];

    return (
      <View style={compositeStyles} key={this.props.index}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 6,
    width: Dimensions.get("window").width * 0.8,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3
    },
    elevation: 3
  }
});

export default CardView;
