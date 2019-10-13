import React ,{Component} from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
class Deck extends Component {
  constructor(props){
    super(props);
    this.state = {
      deck:null,
      drawn:[]
    }
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount(){
    let deck = await axios.get(`${API_BASE_URL}//new/shuffle/?deck_count=1`);
    this.setState({deck:deck.data});
  }
  async getCard(){
    // make a request with deck-id
    // https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      // check if there rae cards remaining to be drawn
      if (!cardRes.data.success){
        throw new Error("No card remaining!");
      }
      // set state using new card info from api
      let card = cardRes.data.cards[0];
      console.log(cardRes.data)
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch(err){
      alert(err);
    }

  }
  render(){
    const cards = this.state.drawn.map(c=>(
      <Card
        image={c.image}
        name={c.name}
        key={c.id}
      />
    ));
    return(
      <div className="Deck">
        <h1 className="Deck-title">♦ Card Dealer ♦</h1>
        <h2 className="Deck-title subtitle">♦ A little demo made with react ♦ </h2>
        <button className="Deck-btn" onClick={this.getCard}>Get Card!</button>
        <div className="Deck-cardarea">
          {cards}
        </div>

      </div>
    )
  }
}


export default Deck;
