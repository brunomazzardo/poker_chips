import React from "react";
import {View, Text, StyleSheet,TouchableHighlight,TextInput,Alert,ScrollView,Image,TouchableOpacity,ImageBackground} from "react-native";
import CardButton from "../components/CardButton";
import TextField from "../components/TextField";
import * as firebase from 'firebase';
import Modal from "react-native-modal";

const chips = [10,20,50,100]


export default class GameScreen extends React.Component {


    static navigationOptions = () => {
       return( {header: null})

    }


    constructor(props){
        super(props);
        this.state = {
            total : 0,
            totalBet:0,
            players_bet : [],
            modal_open:false,
            name:'Jogador Padrão',
            amount_owned : 500
        }
    }

    componentDidMount() {
        this.total_bet_listener()
        this.new_bet_listener()
        this.setState({
            modal_open : true
        })
        this.end_bets_listener()
    }


    total_bet_listener() {
        firebase.database().ref('games/1/turns/1').on('value', (snapshot) => {
            const highscore = snapshot.val().total_amount;
            this.setState({totalBet:highscore})
        });
    }

    new_bet_listener() {
        firebase.database().ref('games/1/turns/1/bets/').on('child_added', (data) => {

            this.setState( (prevState) => ({players_bet:[...prevState.players_bet,data.val()]}))
        });
    }


    end_bets_listener() {
        firebase.database().ref('games/1/turns/1/bets/').on('child_removed', (data) => {
            this.setState(  {players_bet:[]})
        });
    }


    bet = (score) => {
        if(score > this.state.amount_owned)
            Alert.alert(
                'Não tem ficha pra isso',
                'Ta faltando ficha pra fazer essa aposta',
            )
        else {
            this.setState((prevState)=> ({amount_owned: prevState.amount_owned - score}))
            firebase.database().ref('games/1/turns/1').set({
                total_amount: this.state.totalBet + score,
            });

            firebase.database().ref('games/1/turns/1/bets').push({bruno: {player: this.state.name, value: score}})
            this.setState({total:0})
        }
    }

    clearBets = ()=> {
        this.setState((prevState) => ({amount_owned: prevState.amount_owned + prevState.totalBet}))
        firebase.database().ref('games/1/turns/1/bets').remove()
        firebase.database().ref('games/1/turns/1').set({
            total_amount: 0
        });
        this.setState({player_bets:[]})
    }



    render() {
        return (
            <ImageBackground source = {require('../images/poker-table-felt.jpg')} style={{flex:1,alignItems:'center',backgroundColor:'#2cb755'}}>
                <Modal
                    isVisible={this.state.modal_open}
                    presentationStyle={'pageSheet '}
                >
                <View  style = {styles.modal}>
                        <TextInput style = {{padding: 32}} placeholder = {"Bote o nome de seu jogador"}  onChangeText={(text) => this.setState({name:text})}/>

                        <TouchableHighlight
                            onPress={() => {
                                this.setState({modal_open:false})
                            }}>
                            <Text>Esse é meu nome</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
               <View style = {{flex:1/2,alignItems: 'center',justifyContent: 'center'}} >
                   <View style = {{paddingTop:24}}>
                       <Text style = {styles.textStyle}>
                           Suas fichas {this.state.amount_owned}
                       </Text>
                       <Text style = {styles.textStyle} >
                           Total da aposta {this.state.total}
                       </Text>
                       <TextField textStyle = {styles.textStyle} field = {'Aposta total  '} value = {this.state.totalBet} />
                       <ScrollView>
                       {this.state.players_bet.map(bet=> <TextField  textStyle = {{color:'white'}} field = {'Aposta de ' + bet.bruno.player + '     '}  value = {bet.bruno.value} />)}
                       </ScrollView>
                   </View>
               </View>
                <View style = {{flex:2/2,justifyContent:'space-around'}} >
                    <View style = {{flexDirection: 'row',justifyContent:'space-around'}} >
                         <TouchableOpacity  onPress = {()=>this.setState((prevState)=> ({total : prevState.total + 10 }))}>
                             <Image source={require('../images/chips20.png')} style = {{ width:100, height:100}}  resizeMethod={'fit'} />
                         </TouchableOpacity>
                        <TouchableOpacity onPress = {()=>this.setState((prevState)=> ({total : prevState.total + 20 }))}>
                            <Image source={require('../images/chips20.png')} style = {{ width:100, height:100}}   resizeMethod={'fit'} />
                        </TouchableOpacity>
                    </View>
                    <View style = {{flexDirection: 'row',justifyContent:'space-around'}} >
                        <TouchableOpacity  onPress = {()=>this.setState((prevState)=> ({total : prevState.total + 50 }))}>
                            <Image source={require('../images/chips50.png')} style = {{ width:100, height:100}}   resizeMethod={'fit'}  />
                        </TouchableOpacity>
                        <TouchableOpacity viewStyle = {styles.container} onPress = {()=>this.setState((prevState)=> ({total : prevState.total + 100 }))}>
                            <Image source={require('../images/chips100.png')} style = {{ width:100, height:100}}   resizeMethod={'fit'}  />
                        </TouchableOpacity>
                    </View>
                    <CardButton text = {'Apostar'} viewStyle = {{alignSelf:'center',paddingBottom: 10,backgroundColor:'#177734'}}  textStyle = {{color:'white'}}   onPress = {()=>this.bet(this.state.total)} />
                    <CardButton text = {'Limpar'}  viewStyle = {{alignSelf:'center',paddingBottom: 10,backgroundColor:'#177734'}}  textStyle = {{color:'white'}}  onPress = {()=>this.setState({total:0})} />
                    <CardButton text = {'Ganhei!'}  viewStyle = {{alignSelf:'center',paddingBottom: 10,backgroundColor:'#177734'}}  textStyle = {{color:'white'}}  onPress = {()=>this.clearBets()}   />
                </View>

            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {

    borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:100,
    },
    modal: {
        height: 140,
        width: 270,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        alignItems: 'center',
        alignSelf:'center',
        paddingTop: 32
    },
    textStyle : {
        color:'white',
        fontSize : 18
    }
});
