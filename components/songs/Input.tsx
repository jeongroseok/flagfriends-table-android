import React, { useState } from "react";
import { Text, View, TextInput } from "react-native"

function Input() {
    const [keyword, setKeyword] = useState('');
    const [mode, setMode] = useState('');

    return (
        <View>
            <TextInput
                value={keyword}
                onChangeText={setKeyword}
                placeholder={mode === 'title' 
                ? '검색하실 노래의 제목을 입력해주세요' 
                : mode === 'singer' 
                    ? '검색하실 노래의 가수를 입력해주세요' 
                    : ''
                }
            />
        </View>
    )
}

export default Input;