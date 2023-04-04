import React from 'react';
import { View, Text, Image } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import actions from "../store/Manga/actions";
import comment from '../../assets/iconcomment.png';
import flecha from '../../assets/flecha-correcta.png';
import flecha_izquierda from '../../assets/flecha-izquierda.png';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { captureManga, captureChapter } = actions;
function Chapter() {
    const route = useRoute();
    const mangaId = route.params.mangaId;
    const [chapter, setChapter] = useState({});
    const [pages, setPage] = useState(0);
    const { chapterId } = useRoute().params
    const manga = useSelector((store) => store.mangareducer.manga);
    const chapters = useSelector((store) => store.mangareducer.chapter);
    const [showChapters, setShowChapters] = useState(false);
    const [pagina, setPagination] = useState(1); // Set default value to 1
    const { page } = useParams();


    const _id = route.params && route.params._id;
    // console.log(route.params)
    const dispatch = useDispatch();


    const toggleView = () => {
        setShowChapters(!showChapters);
    };

    const handleChapterPress = (chapter) => {
        navigation.navigate('Chapter', { chapterId: chapter._id });
    };

    useEffect(() => {
        if (_id) dispatch(captureManga({ manga_id: _id }));
        if (_id) dispatch(captureChapter({ manga_id: _id, page: pagina }));
    }, [_id, pagina]);

    if (!manga) return null;

    useFocusEffect(
        React.useCallback(() => {
            async function getChapter() {
                try {
                    const response = await axios.get(
                        "https://minga-host.onrender.com/chapters?manga_id="
                    );
                    console.log('response', response.data.chapter)
                    setChapter(response.data.chapter);

                } catch (error) {
                    console.log(error);
                }
            }
            getChapter();
        }, [chapterId]),
    );


    const navigation = useNavigation();
    const handlePrev = () => {
        if (pages === 0) {
            setTimeout(() => {
                navigation.navigate('Chapter', { mangaId: mangaId });
            }, 100);
        } else {
            setPage(pages - 1);
        }
    };

    const handleNext = () => {
        if (pages === chapter?.pages?.length - 1) {
            setTimeout(() => {
                navigation.navigate('Chapter', { mangaId: mangaId });
            }, 100);
        } else {
            setPage(pages + 1);
        }
    };

    const handlePage0 = () => {
        setPage(0);
    };

    return (
        <ScrollView contentContainerStyle={styles.mover}>
            <View style={styles.divChapter2}>
                <Text style={styles.titulo}>{manga?.title}</Text>
                <Text>{manga.category_id && manga?.category_id.name}</Text>
            </View>
            <View>
                <ScrollView contentContainerStyle={styles.contenedorCapitulos}>
                    <TouchableOpacity style={styles.boton} onPress={handlePrev} disabled={pages === 0}>
                        <Image style={[styles.flecha, pages === 0 && styles.disabled]} source={flecha_izquierda} />
                    </TouchableOpacity>
                    <View style={styles.posi}>
                        {[chapters[0]].map((chapter) => {
                            let card = (
                                <TouchableOpacity key={chapter?._id} onPress={() => handleChapterPress(chapter)}>
                                    <View key={chapter?._id}>
                                        <Image source={{ uri: chapter?.pages[pages] }} style={styles.bannerPhotoChapter} />
                                        <Text style={styles.titleChapter}>{chapter?.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                            return card;
                        })}
                    </View>
                    <TouchableOpacity style={styles.boton} onPress={handleNext} disabled={pages === chapter?.pages?.length - 1}>
                        <Image style={[styles.flecha, pages === chapter?.pages?.length - 1 && styles.disabled]} source={flecha} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.divChapter3}>
                <View style={styles.chapter3}>
                    <Image style={styles.comment} source={comment} />
                    <Text>14</Text>
                    <Text>
                        Page: {pages + 1}/{chapter?.pages?.length}
                    </Text>
                    <TouchableOpacity style={styles.Page0Btn} onPress={handlePage0}>
                        <Text style={styles.Page0Text}>Go to page 0</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    );}


    const styles = StyleSheet.create({
        mover: {
            height: 600,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            paddingTop: 50,
            marginTop: 50
        },

        divChapter2: {
            backgroundColor: "#FFA500",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 35,
            height: 50,
        },
        titulo: {
            fontSize: 25,
            display: 'flex',
            alignContent: 'center',
            marginTop: 20,
            color: 'white',

        },

        parrafoChapter2: {
            color: 'white',
        },
        contenedorCapitulos: {
            height: 400,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        boton: {
            width: 50,
            height: 400,
            paddingTop: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
        },
        posi: {
            height: 400,
            paddingTop: 10,
            width: '70%',
            display: 'flex',
            justifyContent: 'center'
        },
        divChapter3: {
            backgroundColor: '#dbd9d9',
            height: 70,
        },
        chapter3: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            gap: 8,
        },
        parrafoChapter3: {
            display: 'flex',
            alignItems: 'center',
            color: 'black',
        },
        comment: {
            width: 20,
            height: 20,
        },
        iconoFlecha: {
            fontSize: 20,
            color: '#000',
            position: 'relative',
            top: 5,
            left: 5,
        },
        flecha: {
            width: 20,
            height: 20
        },
        mangaa: {
            height: '100%',
            width: '100%',
        },
        bannerPhotoChapter: {
            width: 265,
            height: 265,
            borderRadius: 5,
            marginBottom: 5,
            marginLeft: 5,
        },
        contChapters: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            width: '100%',
            marginTop: 10,
        },
        titleChapter: {
            color: '#FFA500',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: '700',
            marginBottom: 5,
        },
        Page0Btn: {
            width: 90,
            height: 30,
            backgroundColor: '#FFA500',
            borderRadius: 40,
            borderWidth: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '700',
            fontSize: 14,
            lineHeight: 17,
            padding: 5,
        },
        Page0Text: {
            color: '#FFFFFF'
        },
    });


    export default Chapter