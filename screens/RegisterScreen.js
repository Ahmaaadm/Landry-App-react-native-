import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const register = () => {
        if(email === "" || password === "" || phone === ""){
            Alert.alert(
                "Registeration error",
                "Ensure that you have filling Email, Password and Phone field with correct data",
                [
                    {
                        text:"Cancel",
                        style: "cancel"
                    }
                ]
            );
        }
        else{
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("user credential:", userCredential);
                const user = userCredential._tokenResponse.email;
                const myUserUid = auth.currentUser.uid;

                setDoc(doc(db,"users",`${myUserUid}`),{
                    email:user,
                    phone:phone
                })

                navigation.navigate("Login")
            })
        }
    }


  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white",alignItems:"center",padding:10}}>
      <KeyboardAvoidingView>
        <View style={{justifyContent:"center",alignItems:"center",marginTop:100}}>
            <Text style={{fontSize:20,color:"skyblue",fontWeight:"bold"}}>Sign Up</Text>

            <Text style={{fontSize:18,marginTop:8,fontWeight:"600"}}>Create a new account</Text>
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
                <TextInput value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder='Password' style={{fontSize:18,borderBottomWidth:1,borderBottomColor:"gray",width:300,marginVertical:20,marginLeft:13}}/>
            </View>
            <View style={{flexDirection:'row',alignItems:"center"}}>
                <Feather name="phone" size={24} color="black" />               
                <TextInput value={phone} onChangeText={(text) => setPhone(text)}  placeholder='Phone No' style={{fontSize:18,borderBottomWidth:1,borderBottomColor:"gray",width:300,marginBottom:20,marginTop:10,marginLeft:13}}/>
            </View>
            <View style={{justifyContent:"center",alignItems:"center",marginTop:30}}>
                <TouchableOpacity onPress={register} style={{backgroundColor:"skyblue",width:100,justifyContent:"center",alignItems:"center",height:50,borderRadius:7}}>
                    <Text style={{fontWeight:"600",fontSize:16}}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:40}}>
                <Text style={{fontSize:16,fontWeight:"bold"}} >Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.replace("Login")}>
                    <Text style={{color:"skyblue",fontSize:16,fontWeight:"bold"}}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})