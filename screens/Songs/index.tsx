import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";
import styled from "styled-components/native";

import { HeartTimer } from "../../components/songs"
import { Search } from "../../components/songs";

const Info = styled.Text`
    color: #fff;
    text-align: center;
    font-size: 21px;
`

function Songs() {
    const [heartCount, setHeartCount] = useState(2);

    const getHeart = (num:number) => {
        setHeartCount(num);
    }

    return (
        <View style={{marginTop: 25}}>
            <HeartTimer count={heartCount} getHeart={getHeart}></HeartTimer>
            
            <Search></Search>

            <View style={{
                backgroundColor: 'black',
                margin: 15,
                padding: 15,
                borderRadius: 25,
            }}>
                <Text style={{color: '#fff', fontSize: 27, fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>안내사항</Text>
                <Info>1. 박세익은 귀여워</Info>
                <Info>2. 박세익은 깜찍해</Info>
                <Info>3. 박세익은 상콤해</Info>
            </View>
        </View>
    )
}

export default Songs;