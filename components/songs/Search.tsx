import React, { useState, useEffect , useRef, useCallback} from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native"

import SearchIcon from "../../assets/search.svg";
import BackIcon from "../../assets/back.svg";
import { useSong } from "../../hooks/songs";

interface autoDatas {
    brand: string;
    no: string;
    title: string;
    singer: string;
    composer: string;
    lyricist: string;
    release: string;
}

function Search() {
    const song = useSong();
    const [mode, setMode] = useState('');
	const [keyword, setKeyword] = useState<string>("");
    const [keyItems, setKeyItems] = useState<autoDatas[]>([]);

    const fetchDataByTitle = ()  =>{
    return fetch(
        `https://api.manana.kr/karaoke/song/${keyword}/tj.json`
    )
    .then((res) => res.json())
    .then((data) => data.slice(0,100))
    }

    const fetchDataBySinger = () => {
        return fetch(
            `https://api.manana.kr/karaoke/singer/${keyword}/tj.json`
        )
        .then((res) => res.json())
        .then((data) => data.slice(0, 100))
    }


    const updateData = async() => {
        let res;
        if (keyword !== '') {
            if (mode === 'title') {
                res = await fetchDataByTitle();
            }
            if (mode === 'singer') {
                res = await fetchDataBySinger();
            }
        }
        setKeyItems(res.slice(0, 10));
        console.log(keyItems);
    }

    const handleSong = useCallback(async (songData:autoDatas) => {
        // 여기서부터!!!
        // await song.request({
        //     id: '11',
        //     no: songData.no,
        //     singer: songData.singer,
        //     title: songData.title,
        //     tableId: "11",
        //     storeId: '11',
            
        // })
    }, [song]);

    const songRequest = (data:autoDatas) => {
        Alert.alert('이 노래로 신청할까요?', '제목 : ' + data.title + '\n가수 : ' + data.singer, [
            {
                text: '신청하기',
                onPress: () => handleSong(data)
            },
            {
                text: '취소',
                onPress: () => console.log('')
            }
        ])
    }

    useEffect(() => {
        updateData();
        },[keyword])

    return (
        <View>
            {mode === '' &&
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: 15, }}>
                    <TouchableOpacity 
                        style={{backgroundColor: '#000', padding : 15, borderRadius: 10}}
                        onPress={() => setMode('title')}    
                    > 
                        <Text style={{color: '#fff'}}>곡명으로 검색하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{backgroundColor: '#000', padding : 15, borderRadius: 10}}
                        onPress={() => setMode('singer')}
                    > 
                        <Text style={{color: '#fff'}}>가수명으로 검색하기</Text>
                    </TouchableOpacity>
                </View>
            }
            {mode !== '' &&
                <View>
                    <BackIcon width={50} height={50} fill="#000" style={{marginLeft: 15}} onPress={() => setMode('')}/>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderRadius: 10,
                        margin: 15,
                        paddingRight: 15
                    }}>
                        <TextInput
                            value={keyword}
                                onChangeText={setKeyword}
                                style={{
                                    flex: 1,
                                    padding: 10
                                }}
                                placeholder={mode === 'title' 
                                ? '검색하실 노래의 제목을 입력해주세요' 
                                : mode === 'singer' 
                                    ? '검색하실 노래의 가수를 입력해주세요' 
                                    : '검색'
                                }
                        />
                        <SearchIcon width={35} height={35} fill="#000" />
                    </View>
                </View>
            }
            {keyItems.length > 0 &&
                    <View style={{borderWidth: 1, marginHorizontal: 15, padding: 10, borderRadius: 10}}>
                        {keyItems.map((item, idx) => (
                            <View key={idx} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: '#000', borderBottomWidth: 1, padding: 10}}>
                                <View>
                                    <Text>{item.title}</Text>
                                    <Text> {item.singer}</Text>
                                </View>
                                <View>
                                <TouchableOpacity 
                                    style={{backgroundColor: '#000', paddingHorizontal: 15, borderRadius: 10, alignItems: 'center' }}
                                    onPress={() => songRequest(item)}
                                >
                                    <Text style={{color: '#fff', textAlign: 'center'}}>선택</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
            }
        </View>
    );
}
export default Search;