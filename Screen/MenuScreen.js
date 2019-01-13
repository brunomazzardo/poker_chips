import React from "react";
import {StyleSheet, View} from "react-native";
import CardButton from "../components/CardButton";

export default class MenuScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <CardButton onPress = {()=>this.props.navigation.navigate("Game")} viewStyle = {{paddingTop:12}} text = {"Entrar em Jogo"}/>
                <CardButton viewStyle = {{paddingTop:12}} text = {"Criar Jogo"}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
