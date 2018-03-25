import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Button,
  TouchableOpacity
} from 'react-native'

import Card from './Card';

export default class Cards extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      currentCard: {},
    }
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
        <Button
          onPress={() => this.getNext()}
          title="NEXT!">
        </Button>
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





















// import Counter from './Counter'
// import Button from './Button'
// const Counters = (props) => {
//   const {
//     newCounter,
//     removeCounter,
//     countersState: { counters },
//     decrement,
//     increment,
//     incrementWithDelay,
//   } = props
//
//   const counterElems = Object.keys(counters).map((id) => {
//     const value = counters[id]
//     return (
//       <Counter
//         key={id}
//         decrementFn={() => decrement(id)}
//         incrementFn={() => increment(id)}
//         incrementWithDelayFn={() => incrementWithDelay(id)}
//         removeCounter={() => removeCounter(id)}
//         >
//         {value}
//       </Counter>
//     )
//   })
//
//   return (
//     <View style={styles.container}>
//       {counterElems}
//       <Button style={styles.Btn} onClick={newCounter}>Add New Counter</Button>
//     </View>
//   )
// }
//
// Counters.propTypes = {
//   countersState: PropTypes.object.isRequired,
//   decrement: PropTypes.func.isRequired,
//   increment: PropTypes.func.isRequired,
//   incrementWithDelay: PropTypes.func.isRequired,
//   newCounter: PropTypes.func.isRequired,
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     paddingTop: 50,
//   },
//   Btn: {
//     marginTop: 50,
//   },
// })
//
// export default Counters
