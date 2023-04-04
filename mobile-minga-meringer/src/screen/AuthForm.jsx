import React from 'react'
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FormRegister from '../components/FormRegister';
import FormLogin from '../components/FormLogin';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function AuthForm({ route, state }) {
    const [render, setRender] = useState('register')
    const [token, setToken] = useState('')

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
    }, []);

    useFocusEffect(React.useCallback(() => {
        setRender(route?.params.state)
    }, []));

    useFocusEffect(React.useCallback(() => {
        if (state) {
            setRender(state)
        }
    }, []));

    return (
        <>
            {
                token ? <View style={styles.noLogged}><TouchableOpacity style={styles.noLoggedButton}><Text style={styles.noLoggedText}>You are already logged in</Text></TouchableOpacity></View>
                    :
                    <>
                        {render === 'register' ? <FormRegister setRender={setRender} /> : ''}
                        {render === 'login' ? <FormLogin setRender={setRender} /> : ''}
                    </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    noLogged: {
        width: windowWidth,
        height: windowHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    noLoggedButton: {
        width: 300,
        height: 80,
        borderRadius: 50000,
        backgroundColor: '#FFA500',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noLoggedText: {
        fontWeight: '700',
        fontSize: 25,
        color: '#EBEBEB',
        letterSpacing: 0.05,
        textDecorationLine: 'none',
    },
});

export default AuthForm