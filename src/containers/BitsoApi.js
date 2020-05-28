import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';

function BtxItem (book) {
    return book ? (
        Object.values(book).map((book) => {
            return(
            <>
                <Col md="4">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <h1>{book.book}</h1>
                            <h2>${book.last}</h2>
                            <Row>
                                <Col md="6">
                                    <h6 style={{color: "red"}}>Low: ${book.low}</h6>
                                </Col>
                                <Col md="6">
                                    <h6 style={{color: "green"}}>High: ${book.high}</h6>
                                </Col>
                                <Col md="6">
                                    <h6>Bid: ${book.bid}</h6>
                                </Col>
                                <Col md="6">
                                    <h6>Ask: ${book.ask}</h6>
                                </Col>
                            </Row>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </>
            )
        })
    ):null;
};

class BitsoApi extends React.Component{
    state = {
        stateBooks: [],
    };

    componentDidMount(){
        const books = [
            "btc_mxn", "btc_usd", "tusd_mxn", "eth_mxn", "xrp_mxn", "ltc_mxn" , "mana_mxn", "gnt_mxn", "bat_mxn", "dai_mxn"
        ];
        
        const url = "https://cors-anywhere.herokuapp.com/https://api.bitso.com/v3/ticker/?book="
        for (const [index, value] of books.entries()) {
            const newLocal = "XMLHttpRequest";

            axios.get(url+value, {
                mode: 'no-cors',
                secure: false,
                headers:{
                    "X-Requested-With": newLocal
                } 
            }).then(result => {
                this.setState({stateBooks: this.state.stateBooks.concat([result.data.payload])});
            })

        }
    }
        render() {
            const currentDate =  moment().format('MMMM Do YYYY, h:mm:ss a');
            return(
                <>
                    <Col md="12">
                        <Col md={{ span: 6, offset: 3 }} sm="12">
                            <Alert variant="success">
                                <Alert.Heading>Last update: {currentDate}</Alert.Heading>
                            </Alert>
                        </Col>
                    </Col>
                    {this.state.stateBooks.map((book) => <BtxItem book={book}/>)}
                </>
           )
        }
};

export default BitsoApi;
