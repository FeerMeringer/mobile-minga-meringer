import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import detailsActions from "../store/Details/actions"
import Spinner from 'react-native-loading-spinner-overlay/lib';

const { mangaClicked } = detailsActions

export default function CardMangas({ title, category, photo, _id }) {
    const [loading, setLoading] = useState()
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const categoryColor = {
        shonen: { color: '#EF8481' },
        shojo: { color: '#00BA88' },
        seinen: { color: '#FC9C57' },
        comic: { color: '#8883F0' }
    };

    function goToDetailsScreen() {
        dispatch(mangaClicked({ state: true }))
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigation.navigate('Details', { _id });
        }, 500);

    }

    return (
        <View style={styles.card}>
            <View style={styles.text1}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={[{ fontSize: 16 }, categoryColor[category]]}>{category}</Text>
                </View>
                <Text
                    style={styles.read}

                    onPress={goToDetailsScreen}
                >
                    Details
                </Text>

            </View>

            <View style={styles.imgContainer}>
                <Image style={styles.imgManga} source={photo} />
            </View>
            <Spinner visible={loading} textContent={'Loading...'} textStyle={{ color: '#FFF' }} />
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(238, 238, 238, 1)",
        flexDirection: 'row',
        marginVertical: 10,
        width: "95%",
        borderWidth: 3,
        borderColor: '#FFA500',
        borderRadius: 16
    },
    shonen: {
        backgroundColor: '#F06C9B',
    },
    text1: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        width: "50%",
        justifyContent: "center",
        gap: 30
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    categoryName: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    read: {
        backgroundColor: "#FFA500",
        color: '#FFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    imgContainer: {
        width: "50%",
        height: 150,
        borderRadius: 5,
        overflow: 'hidden',
    },
    imgManga: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 16
    },
});