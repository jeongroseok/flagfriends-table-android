import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTimer } from "../../hooks"
import HeartIcon from "../../assets/heart.svg";

const loadTime = async() => {
    try {
        const value:any = await AsyncStorage.getItem('endTime');        
        return (parseInt(value));
    } catch(e) {
        console.log("asyncStroage에서 time 못 불러옴ㅠㅠ");
        return new Date().getTime() + 180000;
    }
}

const saveTime = async(endTime:number) => {
    try {
        await AsyncStorage.setItem('endTime', endTime.toString());
    } catch(e) {
        console.log("asyncStorage에 등록하는거 실패해쏘ㅠㅠ");
    }
}


function HeartTimer(props:any) {
    let dateTime = new Date().getTime() + 180000
    const [time, setTime] = useState(dateTime); // 끝나는 시간
    const { leftTime, start, stop} = useTimer(time);
    const [songCount, setSongCount] = useState(0); // 노래 신청 횟수

    useEffect(() => {
        // 0초 되고 하트 개수가 3개보다 적으면 하트 채우기
        if (leftTime <= 0  && props.count < 3) {
            props.getHeart(props.count + 1); //하트 1개 늘리기
            let etime = new Date().getTime() +10000+ (60000 * songCount) //지금 시간 + 3분 + 노래신청횟수 * 1분
            setTime(etime);
            saveTime(etime);
            setSongCount(c => c+1);
        }
    }, [leftTime,songCount]);

    useEffect(() => {
        // 하트 비워지면 타이머 돌아가기
        if (props.count < 3) {
            start();
        }
        if (props.count === 3) {
            stop();
        }
    }, [props.count]);

    useEffect(() => {
        let res:any = loadTime();
        setTime(res);        
    }, [])

    return (
        <View >
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <HeartIcon width={50} height={50} fill={props.count >= 1 ? 'tomato': 'grey'} />
                <HeartIcon width={50} height={50} fill={props.count >= 2 ? 'tomato': 'grey'} />
                <HeartIcon width={50} height={50} fill={props.count >= 3 ? 'tomato': 'grey'} />
            </View>

            {props.count !== 3 &&
                <Text style={{textAlign: 'center'}}> {leftTime} </Text>
            }
            
        </View>
    )
}

export default HeartTimer;

// 하트 메커니즘
// 디폴트는 3분,  노래 신청 한 번마다 1분 씩 증가
