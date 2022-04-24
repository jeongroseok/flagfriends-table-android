import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { useTimer } from "../../hooks"
import HeartIcon from "../../assets/heart.svg";

function HeartTimer(props:any) {
    const [time, setTime] = useState(180);
    const { second, start, stop, reset} = useTimer(time);
    const [count, setCount] = useState(props.count);

    useEffect(() => {
        // 0초 되면 하트 채우기
        if (second <= 0  && props.count < 3) {
            props.getHeart(props.count + 1);
            setTime(c => c + 60);
            reset();
        }
    }, [second]);

    useEffect(() => {
        // 하트 비워지면 타이머 돌아가기
        if (props.count < 3) {
            start();
        }
        if (props.count === 3) {
            stop();
        }
    }, [props.count]);

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

            {count !== 3 &&
                <Text style={{textAlign: 'center'}}> {Math.floor(second / 60)} : {second % 60} </Text>
            }
            
        </View>
    )
}

export default HeartTimer;

// 하트 메커니즘
// 디폴트는 3분,  노래 신청 한 번마다 1분 씩 증가
