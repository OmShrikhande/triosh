import { View, Text,Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'


WebBrowser.maybeCompleteAuthSession()
export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
        })
  
        if (createdSessionId) {
          setActive({ session: createdSessionId })
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error('OAuth error', err)
      }
    }, []);


  return (
    
    <View>
        <View style={{
            display:'flex',
            alignItems:'center',
            marginTop:120,
        }}>

            <Image source={require('../assets/images/DemoLogin.png')}
            style={{
                width:220,
                height:450,
                borderWidth:2,
                borderRadius:20,
                borderColor:'#fff'
            }}
                />
          </View>

          <View style={styles.subContainer}>
            <Text style={{fontSize:35, textAlign:'center', fontFamily:'flux-bold'}}> Your Ultimate <Text style={{fontFamily:'flux-bold',color:Colors.PRIMARY}}> TRIOSH An IOT Controller</Text> App</Text>

            <Text style={{fontSize:15,fontFamily:'flux',color:Colors.GRAY,textAlign:'center',marginVertical:15}}>
                Let you become the Controller of your environment single handedly
            </Text>

            <TouchableOpacity style={styles.btn} onPress={onPress}>

                <Text style={{color:'#fff',fontFamily:'flux-bold'}}>Let's Gooo!!</Text>    
            </TouchableOpacity>
          </View>
    </View>
  )
}

// External stylesheet
const styles = StyleSheet.create({
    subContainer:{
        backgroundColor:'#fff',
        padding:30,
        marginTop:-20,
    },
    btn:{
        backgroundColor:Colors.PRIMARY,
        padding:15,
        borderRadius:90,
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        borderBlockColor:'#000',
        borderWidth:2,
        
    }
})