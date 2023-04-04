import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import bottomTabsActions from '../store/Perfil/action';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import google from "../../assets/Googlee.png"
import { Alert } from 'react-native';

const { reloadBottomTabs } = bottomTabsActions

export default function FormLogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  let state = useSelector(store => store.bottomTabsReducer.state)
  const [loading, setLoading] = useState()

  async function handleSubmit() {
    let data = {
      email: email,
      password: password
    };
    
    let url = 'https://minga-host.onrender.com/auth/signin';

    try {
      setLoading(true)
      const response = await axios.post(url, data);
      const { token, user } = response.data;
      
      // Almacenar el token en AsyncStorage y luego imprimir el valor almacenado
      await AsyncStorage.setItem('token', token);
      const storedToken = await AsyncStorage.getItem('token');
      console.log('Token almacenado:', storedToken);
      
      // Almacenar los datos del usuario en AsyncStorage y luego imprimir el valor almacenado
      await AsyncStorage.setItem('user', JSON.stringify({
        name: user.name,
        email: user.email,
        photo: user.photo,
      }));
      const storedUser = await AsyncStorage.getItem('user');
      console.log('Usuario almacenado:', storedUser);
      console.log('logueado');
      dispatch(reloadBottomTabs({ state: !state }))
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      Alert.alert(
        'User logged in!',
        'Press "OK" to read',
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    
    <View style={styles.container}>
    
      <View style={styles.fieldset}>
        <Text style={styles.legend}>Email</Text>
        <View style={styles.legendCont}>
          <TextInput
            style={styles.input}
            id="email"
            name="email"
            required
            onChangeText={(inputText) => setEmail(inputText)}
          />
        </View>
      </View>

      <View style={styles.fieldset}>
        <Text style={styles.legend}>Password</Text>
        <View style={styles.legendCont}>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            id="password"
            name="password"
            required
            onChangeText={(inputText) => setPassword(inputText)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
        <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
      </TouchableOpacity>

      <View style={styles.divGoogle}>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            // handle Google sign up logic here
          }}
        >
          <Image style={styles.googleImg} source={google} />
          <Text style={styles.buttonText2}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.parrafosForm}>
        <Text>
          You don't have an account yet?
          <Text
            style={styles.parrafosFormText}
            onPress={() => {
              navigation.navigate('register');
            }}
          >
            {' '}
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 20,
    marginTop: 30,
    width: "100%",
    height: "100%",
    background: "#F7F7F7",
  },
  
  fieldset: {
    display: "flex",
    alignItems: "center",
    width: 410,
    height: 65,
    width: "90%",
    justifyContent: "center",
    background: "#EBEBEB",
  borderBottomWidth: 1,
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  legendCont:{
    display: "flex",
    width:"100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imagen:{
    width: 19,
    height: 19,
    marginBottom: 10,
  },
  googleImg: {
    width: 30,
    height:30
  },
  buttonText2:{
    color: "gray"
  },
  legend: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 1,
    fontWeight: 500,
    color: "#5F5F5F",
  },
  input: {
    width: "90%",
    backgroundColor: "transparent",
    height: 45,
    fontSize: 15,
    padding: 11,
    borderRadius: 5,
  },
  divCheck: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 12,
    lineHeight: 5,
    letterSpacing: 5,
    color: "#1F1F1F",
    gap: 5,
    width: 410,
  },

  button: {
    backgroundColor: "#FF6600",
    borderRadius: 8,
    height: 50,
    marginBottom: 30,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
},
  buttonText: {
    color: "white"
  },

  button2: {
    backgroundColor: "white",
    borderRadius: 8,
    height: 50,
    margin: 15,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    gap: 10
},
  
  buttonText3: {
    color: "grey"
  },

  divGoogle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 410,
    height: 16,
    borderRadius: 10,
    background: "#EBEBEB",
    border: 1,
  },

  parrafosForm: {
    display: "flex",
    gap: 17,
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  parrafosFormText:{
    color: "#3B3B3B",
    fontWeight: 700,
  },
});