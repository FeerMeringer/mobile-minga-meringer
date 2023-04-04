import React, { useState } from 'react';
import axios from 'axios';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import google from "../../assets/Googlee.png"
import { Alert } from 'react-native';

export default function FormRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation()
    const [loading, setLoading] = useState()

    async function handleSubmit() {
        let data = {
            name: name,
            email: email,
            photo: photo,
            password: password
        }

        let url = 'https://minga-host.onrender.com/auth/signup'
        try {
            setLoading(true)
            await axios.post(url, data)
            console.log('creado')
            setTimeout(() => {
                setLoading(false);
            }, 3000);
            navigation.navigate("Home")
            Alert.alert(
                'Account created!',
                'Your account has been created successfully.',
            );
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.fieldset}>
                <Text style={styles.legend}>Name</Text>
                <View style={styles.legendCont}>
                    <TextInput style={styles.input} id="name" name="name" required onChangeText={(inputText => setName(inputText))} />

                </View>
            </View>

            <View style={styles.fieldset}>
                <Text style={styles.legend}>Email</Text>
                <View style={styles.legendCont}>
                    <TextInput style={styles.input} id="email" name="email" required onChangeText={(inputText => setEmail(inputText))} />

                </View>
            </View>

            <View style={styles.fieldset}>
                <Text style={styles.legend}>Photo</Text>
                <View style={styles.legendCont}>
                    <TextInput style={styles.input} id="photo" name="photo" required onChangeText={(inputText => setPhoto(inputText))} />

                </View>
            </View>

            <View style={styles.fieldset}>
                <Text style={styles.legend}>Password</Text>
                <View style={styles.legendCont}>
                    <TextInput style={styles.input} secureTextEntry={true} id="password" name="password" required onChangeText={(inputText => setPassword(inputText))} />

                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign up</Text>
                <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
            </TouchableOpacity>

            <View style={styles.divGoogle}>
                <TouchableOpacity style={styles.button2} onPress={() => {
                    // handle Google sign up logic here
                }}>
                    <Image style={styles.googleImg} source={google} />
                    <Text style={styles.buttonText2}>Sign up with Google</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.parrafosForm}>
                <Text>
                    Already have an account?
                    <Text style={styles.parrafosFormText} onPress={() => {
                        navigation.navigate("Home");
                    }}> Log in</Text>
                </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        gap: 20,
        marginTop: 50,
        width: "100%",
    },
    fieldset: {
        display: "flex",
        alignItems: "center",
        width: 400,
        height: 70,
        width: "90%",
        justifyContent: "center",
        background: "#F2F2F2",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#E5E5E5",
    },
    legendCont: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    imagen: {
        width: 25,
        height: 25,
        marginBottom: 15,
    },
    googleImg: {
        width: 35,
        height: 35,
        marginRight: 10,
    },
    buttonText2: {
        color: "#A6A6A6",
        fontSize: 16,
        fontWeight: "bold",
    },
    legend: {
        marginLeft: 10,
        fontSize: 18,
        lineHeight: 22,
        letterSpacing: 0.5,
        fontWeight: 700,
        color: "#1C1C1C",
    },
    input: {
        width: "100%",
        backgroundColor: "#F7F7F7",
        height: 45,
        fontSize: 16,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },
    divCheck: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.5,
        color: "#1F1F1F",
        gap: 5,
        width: 400,
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
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
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
        color: "#1C1C1C",
        fontSize: 16,
        fontWeight: "bold",
    },

    divGoogle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 400,
        height: 40,
        borderRadius: 8,
        background: "#F2F2F2",
        borderWidth: 2,
        borderColor: "#E5E5E5",
        flexDirection: "row",
        gap: 10,
        padding: 10
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

    parrafosFormText: {
        color: "#3B3B3B",
        fontWeight: 700,
    },
});