import { ActivityIndicator, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';


const LoginScreen = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(null);
    const[turn, setTurn] = useState(true);

    const login = () => {
        signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
            console.log("user Credential:", userCredential);
            const user = userCredential.user;
            console.log("user details", user)
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(!authUser){
                setLoading(true);
            }
            if(authUser){
                setLoading(navigation);
                navigation.navigate("Home");
            }
        })

        return unsubscribe;
    },[])


  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white",alignItems:"center",padding:10}}>
      <KeyboardAvoidingView>
        <View style={{justifyContent:"center",alignItems:"center",marginTop:100}}>
            <Text style={{fontSize:20,color:"skyblue",fontWeight:"bold"}}>Sign In</Text>

            <Text style={{fontSize:18,marginTop:8,fontWeight:"600"}}>Sign In to your account</Text>
        </View>

        <View style={{marginTop:50}}>
            <View style={{flexDirection:'row',alignItems:"center"}}>
                <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                <TextInput value={email} onChangeText={(Text) => setEmail(Text)} placeholder='Email' style={{fontSize:18,borderBottomWidth:1,borderBottomColor:"gray",width:300,marginVertical:10,marginLeft:13}}/>
            </View>
        </View>
        <View>
            <View style={{flexDirection:'row',alignItems:"center"}}>
                <Ionicons name="key-outline" size={24} color="black" />
                <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='password' style={{fontSize:18,borderBottomWidth:1,borderBottomColor:"gray",width:300,marginVertical:20,marginLeft:13}}/>
            </View>
            <View style={{justifyContent:"center",alignItems:"center",marginTop:30}}>
                <TouchableOpacity onPress={()=>{login;setTurn(!turn)}} style={{backgroundColor:"skyblue",width:100,justifyContent:"center",alignItems:"center",height:50,borderRadius:7}}>
                    <Text style={{fontWeight:"600",fontSize:16}}>Sign In</Text>
                    {
                        !turn && <ActivityIndicator color={"red"} />                    }
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:40}}>
                <Text style={{fontSize:16,fontWeight:"bold"}} >Dont have an account?</Text>
                <TouchableOpacity onPress={() => {navigation.replace("Register");}}>
                    <Text style={{color:"skyblue",fontSize:16,fontWeight:"bold"}}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})