import React from "react";
import {
    createStackNavigator,
    createAppContainer
} from "react-navigation";


import MenuScreen from './Screen/MenuScreen'
import GameScreen from './Screen/GameScreen'

 const AppStack = createStackNavigator(
    {
        Menu: {
            screen: MenuScreen
        },
        Game: {
            screen: GameScreen
        },
    },
     {
         initialRouteName: "Menu"
     },
);

export const AppContainer = createAppContainer(AppStack);
