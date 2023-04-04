import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useState } from "react";
import AuthForm from './AuthForm'
import Hero from '../components/Hero';
import Login from '../components/FormLogin'

export default function Mangas() {
    let state = 'register'

    let [token, setToken] = useState('')
    useEffect(() => {
        async function getData() {
            try {
                const value = await AsyncStorage.getItem('token');
                setToken(value)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [state]);

    return (
        <ScrollView style={{height: '200%'}}>
            <Hero />
            {token ? '' : <AuthForm state={state} />}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#FFA500",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'black',
        fontSize: 35
    }
});