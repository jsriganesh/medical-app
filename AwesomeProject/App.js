import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './navigations';
import store from "./src/redux/store/store";
import { Provider } from 'react-redux'
import { getData, storageKeys } from "./src/components/asyncStorage"

class App extends Component {


  constructor(props){
    super(props)
    this.state={
      accessToken:""
    }
  }

 async componentDidMount(){
    // SplashScreen.hide();
    var localData = await getData(storageKeys.loginDetails)
    var accessToken = ""
    if (localData && localData.accessToken) {
      accessToken = localData.accessToken
    }  

    this.setState({
      accessToken:accessToken
    })

  }


  render() {
    return (
      <Provider store={store}>
        <RootNavigation accessToken={this.state.accessToken}/>
      </Provider>
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


export default App;





import { Platform } from 'react-native'

const noGlow = `
textarea, select, input, button {
	-webkit-appearance: none;
	outline: none!important;
}
textarea:focus, select:focus, input:focus, button:focus {
	-webkit-appearance: none;
	outline: none!important;
}
`

export const injectWebCss = f => {

	// Only on web
	if ( !Platform.OS == 'web' ) return

	// Inject style
	const style = document.createElement('style')
	style.textContent = `textarea, select, input, button { outline: none!important; }`
	return document.head.append(style)

}

// 👉 And this in the App.js file
injectWebCss()