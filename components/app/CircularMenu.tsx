import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { ReactNode, useRef, useState } from "react";

class CircleView extends React.Component<any> {
  render() {
    const { radius, color, style, ...rest } = this.props;
    return (
      <View
        style={{
          backgroundColor: color,
          justifyContent: "center",
          alignItems: "center",
          width: radius,
          height: radius,
          borderRadius: radius,
          ...StyleSheet.flatten(style),
        }}
        {...rest}
      />
    );
  }
}

class Overlapping extends React.Component<any> {
  render() {
    const { style, ...rest } = this.props;
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: "center",
            alignItems: "center",
            ...StyleSheet.flatten(style),
          },
        ]}
        {...rest}
      />
    );
  }
}

const AnimatedCircleView = Animated.createAnimatedComponent(CircleView);
const DURATION = 250;

type Props = View["props"] & {
  radius: number;
  onLongPress?: () => void;
  center?: ReactNode;
};
interface State {
  anim: Animated.Value;
  isOpen: boolean;
}

class CircularMenu extends React.Component<Props, State> {
  state = { anim: new Animated.Value(0), isOpen: false };

  open() {
    Animated.timing(this.state.anim, {
      toValue: 1,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
  }

  close() {
    Animated.timing(this.state.anim, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
      easing: Easing.exp,
    }).start();
  }

  handleLongPress = () => {
    if (this.props.onLongPress) {
      this.props.onLongPress();
    }
  };

  toggle() {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
    if (this.state.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  render() {
    const { style, radius, center, ...otherProps } = this.props;
    const layers = [
      { color: "#000000CF", radius: radius * 1.65 },
      { color: "#0000001F", radius: radius * 1.55 },
      { color: "#0000001F", radius: radius * 1.25 },
      { color: "#0000001F", radius: radius * 0.9 },
    ];
    const animationStyle = {
      transform: [{ scale: this.state.anim }],
      opacity: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    };
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];
    const outerRadius = radius * Math.PI * 1.2;
    const itemDistance = (radius - outerRadius) / 2;
    const itemAngleRange = 200 * (Math.PI / 180);
    const itemAngleInterval = itemAngleRange / children.length;
    const itemAngleOffset =
      itemAngleInterval / 2 - (itemAngleRange - 180 * (Math.PI / 180)) / 2;

    return (
      <View style={[style]} {...otherProps}>
        <Overlapping>
          <AnimatedCircleView
            style={animationStyle}
            radius={outerRadius}
            color={"white"}
          >
            {children.map((child, index) => (
              <View
                key={index}
                style={{
                  alignItems: "center",
                  position: "absolute",
                  transform: [
                    {
                      translateX:
                        Math.cos(itemAngleOffset + itemAngleInterval * index) *
                        itemDistance,
                    },
                    {
                      translateY:
                        Math.sin(itemAngleOffset + itemAngleInterval * index) *
                        itemDistance,
                    },
                  ],
                }}
              >
                <View>{child}</View>
              </View>
            ))}
          </AnimatedCircleView>
        </Overlapping>
        {layers.map((layer, index) => {
          return (
            <Overlapping key={index}>
              <AnimatedCircleView
                style={animationStyle}
                radius={layer.radius}
                color={layer.color}
              />
            </Overlapping>
          );
        })}
        <Pressable
          onLongPress={() => this.handleLongPress()}
          onPress={() => this.toggle()}
        >
          <AnimatedCircleView
            style={{
              borderWidth: 1,
              borderColor: "black",
              transform: [
                {
                  scale: this.state.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.65],
                  }),
                },
              ],
              opacity: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.1],
              }),
            }}
            radius={radius}
            color={"black"}
          />
          <Overlapping>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: this.state.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.85],
                    }),
                  },
                ],
              }}
            >
              {center}
            </Animated.View>
          </Overlapping>
        </Pressable>
      </View>
    );
  }
}

export default CircularMenu;
