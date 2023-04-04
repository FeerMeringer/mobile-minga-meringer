import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import fondo from "../../assets/anime.jpg";
import actions from "../store/Manga/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigation } from '@react-navigation/native';

const { captureManga, captureChapter } = actions;

export default function Details({ route }) {
    const manga = useSelector((store) => store.mangareducer.manga);
    const chapters = useSelector((store) => store.mangareducer.chapter);
    const [showChapters, setShowChapters] = useState(false);
    const [pagina, setPagination] = useState(1); // Set default value to 1
    const { page } = useParams();


    const _id = route.params && route.params._id;
    // console.log(route.params)
    const dispatch = useDispatch();

    const navigation = useNavigation();

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

    return (
        <ImageBackground source={fondo} style={styles.container}>
            <View style={styles.containTotal}>
                <ScrollView>
                    <View style={styles.fondoMangaImg}>
                        <View style={styles.fondoManga}>
                            <Image
                                source={{ uri: manga.cover_photo }}
                                style={styles.bannerPhoto}
                            />
                        </View>
                    </View>

                    <View style={styles.sectionManga}>

                        <Text style={styles.titulo}>{manga?.title}</Text>
                        <Text>{manga.category_id && manga?.category_id.name}</Text>
                        <View>
                            <TouchableOpacity onPress={toggleView}>
                                <Text style={styles.show}>{showChapters ? " chapter" : "description"}</Text>
                            </TouchableOpacity>
                            {showChapters ? (
                                // Vista de capítulos
                                <View style={styles.contChapters}>
                                    {[chapters[0]].map((chapter) => {
                                        let card = (
                                            <TouchableOpacity key={chapter?._id} onPress={() => handleChapterPress(chapter)}>
                                                <View key={chapter?._id}>

                                                    <Image source={{ uri: chapter?.pages[0] }} style={styles.bannerPhotoChapter} />
                                                    <Text style={styles.titleChapter}>{chapter?.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        );

                                        return card;
                                    })}
                                </View>
                            ) : (
                                // Vista de descripción
                                <Text style={styles.descripcion}>{manga.description}</Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = {
    loadMoreButton: {
        color: "white",
        fontSize: 15,
        height: 22,
        borderRadius: 15,
        width: 110,
        backgroundColor: "#6699CC", // a light blue color
        textAlign: "center",
    },
    noMoreButton: {
        color: "white",
        fontSize: 15,
        height: 22,
        borderRadius: 15,
        width: 200,
        backgroundColor: "#FFA500",
        textAlign: "center",
    },
    containTotal: {
        width: "100%",
        minHeight: "100%",
        justifyContent: "center",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    fondoMangaImg: {
        width: "100%",
        marginTop: 100,
    },
    fondoManga: {
        width: "100%",
        height: 100,
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "center",
        marginBottom: 50,
        gap: 15,
    },

    title: {
        fontSize: 44,
        fontWeight: "bold",
        marginRight: 10,
        color: "#FFA500", // a dark gray color
    },
    searchContainer: {
        flex: 1,
        height: 60,
        backgroundColor: "#F5F5F5", // a light gray color
        borderRadius: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    sectionManga: {
        flex: 1,
        padding: 20,
        width: "100%",
        borderRadius: 80,
        alignItems: "center",
        flexDirection: "column",
        marginTop: 75,
        minHeight: "100%"
    },
    contCartas: {
        justifyContent: "center",
        alignItems: "center",
    },
    bannerPhoto: {
        marginTop: 140,
        width: 240,
        height: 250,

    },
    desripcion: {
        color: "#FFA500", // a dark gray color
        height: 400,
        padding: 15,
        fontSize: 18,
        textAlign: "center"
    },
    titulo: {
        color: "white",
        fontSize: 30,
        marginBottom: 10,
        fontWeight: 900
    },
    show: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        backgroundColor: "#FFA500",
        borderRadius: 50,
        marginBottom: 10,
        fontWeight: 500
    },
    bannerPhotoChapter: {
        width: 180,
        height: 180,

    },
    contChapters: {
        width: 360,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 15
    },
    titleChapter: {
        color: "#FFA500",
        textAlign: "center",
        fontSize: 24,
    }
};


