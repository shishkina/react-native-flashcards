import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Button,
  TouchableOpacity
} from 'react-native'

export default class Card extends Component {

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }
  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }
  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    return (
      <TouchableOpacity onPress={() => this.flipCard()}>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Text style={styles.flipText}>
            {this.props.currentCard.question}
          </Text>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
          <Text style={styles.flipText}>
            {this.props.currentCard.answer}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    flipCard: {
      width: 400,
      height: 400,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
      backfaceVisibility: 'hidden',
    },
    flipCardBack: {
      backgroundColor: "red",
      position: "absolute",
      top: 0,
    },
    flipText: {
      width: 200,
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
    }
  });
