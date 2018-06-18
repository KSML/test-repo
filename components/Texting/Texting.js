import React, {Component} from 'react';
import { AppRegistry, Text, TextInput, View, Button} from 'react-native';

export default class TestTexting extends Component {
    constructor(props){
        super(props)
        this.state = {
            page: 1,
            userName: undefined,
            roomName: undefined,
            userInput: undefined,
            webResponse: ' '
        };
        this.getRequest = this.getRequest.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.decode = this.decode.bind(this)
        this.encode = this.encode.bind(this)
    }

    getRequest(input,doWriteResponse){
        // sets webResponse to whatever is returned from the server
        // while the server is responding webPending is set to true
        // 'input' passed to getRequest is used to determine the parameters of the request

        this.setState({webPending:true});
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                if (doWriteResponse) this.setState({webResponse:xmlHttp.responseText});
            }
        }.bind(this);
        xmlHttp.open("GET","https://ksmlgames3.herokuapp.com?"+input,true);
        xmlHttp.send(null);
    }

    onSubmit(){
        if (this.state.page == 1){
            this.setState({page: this.state.page+1, userName: this.state.userInput})
        }
        else if (this.state.page == 2){
            this.setState({page: this.state.page+1, roomName: this.state.userInput})
            func = this.getRequest
            roomName = this.state.userInput // can use roomName because setState is async
            window.setInterval(function(){
                // func("func=read&tableID="+this.state.roomName+"&start=0&length=1000",true)
                func("func=read&tableID="+roomName+"&start=0&length=1000",true)
            },500);
        }
        else{
            input = this.encode(this.state.userInput)
            this.getRequest('func=append&tableID='+this.state.roomName+'&input='+input,false)
        }
    }

    onChange(input){
        // comment
        this.setState({userInput:input})
    }


    encode(input){
        // comment
        return "\n"+this.state.userName+": "+input+"\n"
    }

    decode(input){
        // comment
        return input
    }




    render(){
        if (this.state.page == 1){
            return(
                <View style={{padding: 30}}>
                    <Text>Enter user name below:</Text>
                    <TextInput
                        placeholder = "enter user name here"
                        onChangeText = {this.onChange}
                        onSubmitEditing = {this.onSubmit}/>
                </View>
            )
        }
        if (this.state.page == 2){
            return(
                <View style={{padding: 30}}>
                    <Text>user name is: {this.state.userName}</Text>
                    <Text>Enter room name below:</Text>
                    <TextInput
                        placeholder = "enter room name here"
                        onChangeText = {this.onChange}
                        onSubmitEditing = {this.onSubmit}/>
                </View>
            )
        }
        if (this.state.page == 3){
            return (
                <View style={{padding: 30}}>
                    <Text>user name is: {this.state.userName}</Text>
                    <Text>room name is: {this.state.roomName+"\n"}</Text>
                    <Text>type message here:</Text>
                    <TextInput placeholder="enter message here"
                        onChangeText={this.onChange}
                        onSubmitEditing={this.onSubmit}/>
                    <Text>{"\nThread:"}</Text>
                    <Text>{this.decode(this.state.webResponse)}</Text>
                </View>
            );
        }
        else{
            return (
                <View style={{padding: 30}}>
                    <Text>ERROR</Text>
                </View>
            )
        }
        
    }
}












