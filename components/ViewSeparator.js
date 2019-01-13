//@flow

import React, { Component } from "react";
import { View } from "react-native";

type Props = {
  color: string,
  width: number
};

type State = {};

class ViewSeparator extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const style = {
      borderColor: this.props.color,
      borderWidth: this.props.width
    };

    return <View style={style} />;
  }
}

export default ViewSeparator;
