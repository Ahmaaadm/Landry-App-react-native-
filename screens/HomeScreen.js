import { View, Text, Alert, SafeAreaView, StyleSheet, Pressable, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { SliderBox } from "react-native-image-slider-box";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItems from "../components/DressItems";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, printQ } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import PickUpScreen from "./PickUpScreen";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const navigation = useNavigation();

  const total = cart.map((item) => item.quantity * item.price).reduce((cuur,prev) => cuur + prev,0);

  const [displayCurrentadress, setDsiplayCurrentAdress] = useState(
    "we are loading your location..."
  );
  const [locationServicesEnabled, setLocationServisesEnabled] = useState(false);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location servises not Enabled",
        "please enable Location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setLocationServisesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission denied", "allow up to use location servises", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }

    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const response = await Location.reverseGeocodeAsync({
        latitude: coords.latitude, // Corrected
        longitude: coords.longitude, // Corrected
      });

      //console.log(response);

      for (let item of response) {
        let address = `${item.name}, ${item.country}`;
        setDsiplayCurrentAdress(address);
      }
    }
  };

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const product = useSelector((state) => state.product.product);
  //console.log("Product array:",product);

  const dispatch = useDispatch();

  useEffect(() => {
    if(product.length > 0)return;

    const fetchProduct = () => {
      services.map((service) => dispatch(getProducts(service)));
    }
    fetchProduct()
  },[])
  console.log(product)
  

  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 8,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 15,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 6,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 12,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 4,
    },
  ];
  return (
    <>
    <ScrollView style={{backgroundColor:"#F0F0F0", flex:1, marginTop:50}}>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text>{displayCurrentadress}</Text>
        </View>

        <Pressable style={{marginLeft:'auto', marginRight:10}}>
          <Image 
            style={{width:40, height:40}}
            source={require('../assets/luser.png')}
          />
        </Pressable>
      </View>
      <View style={{
        padding:10,
        flexDirection:'row',
        margin:10,alignItems:'center',
        justifyContent:'space-between',
        borderColor:'#C0C0C0',
        borderWidth:0.8,
        borderRadius:7}}>
        <TextInput placeholder="search for items or more" />
        <Ionicons name="search" size={24} color="#fd5c63"  />
      </View>

        <Carousel/>

        <Services/>

      {product.map((item,index) => (
        <DressItems item={item} key={index}/>
        
        
      ))}

        

    </ScrollView>

    {(total === 0)?(
      null
    ):(
    <Pressable style={{backgroundColor:'#088F8F',padding:10,marginBottom:30,borderRadius:7,margin:15,flexDirection:"row",justifyContent:"space-between",alignItems:'center'}}>
      <View>
        <Text style={{fontSize:17,fontWeight:'600',color:"white"}}>{cart.length} items | {total}$</Text>
        <Text style={{fontSize:14,fontWeight:'400',color:"white", marginVertical:6}}>Extra charges may apply!</Text>
      </View>
    

      <TouchableOpacity onPress={() => navigation.navigate("PickUp")}>
        <Text style={{fontSize:20,fontWeight:'600',color:"white"}}>Procced to pickup</Text>
      </TouchableOpacity>
    </Pressable>

    )}

    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
