import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity
} from 'react-native';

import Card from './Card';
import Button from './Button';

export default class Cards extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      currentCard: {},
    }
    this.getNext = this.getNext.bind(this)
  }
  componentDidMount() {
    Promise.resolve(this.getAllCards()).then(() => (this.getRandomCard()))
  }

  getAllCards() {
    return fetch('https://naturalization-flashcads-api.herokuapp.com/api/flashcards')
      .then(flashcards => flashcards.json())
      .then(flashcards => {
        this.state.cards = flashcards.data;
      })
      .catch(err => console.log(err));
  }
  getRandomCard() {
    const random = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    const randomCard = this.state.cards.find(card => card.id === random )
    this.setState((prevState) => ({
      cards: prevState.cards.filter(card => card.id !== randomCard.id),
      currentCard: randomCard
    }));
  }
  getNext() {
    this.getRandomCard()
  }
  render() {
    return (
      <View style={styles.container}>
        <Card currentCard={this.state.currentCard} />
        <Button onClick={this.getNext}> Next </Button>
      </View>
    );
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
