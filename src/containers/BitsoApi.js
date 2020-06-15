import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function refreshPage() {
    window.location.reload(false);
  }
  

function BtxItem (book) {
    return book ? (
        Object.values(book).map((book) => {
            return book? (
            <>
                <Col id="test" md="4">
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
            ):null;
        })
    ):null;
};

class BitsoApi extends React.Component{
    constructor(){
        super();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.state = {
            stateBooks: [],
            isLoading: true,
            currentCount: 60
        };
    }

    timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })
        console.log(this.state.currentCount);
        if(this.state.currentCount === 1) { 
            console.log(this.state);
            this.state.stateBooks = [];
            this.state.isLoading = true;
            this.state.currentCount = 60;
            this.intervalId = setInterval(this.timer.bind(this), 1000);
            this.forceUpdateHandler();
            clearInterval(this.intervalId);
        }
      }

    forceUpdateHandler(){
        if (this.state.isLoading){
            const books = [
                "btc_mxn", "btc_usd", "tusd_mxn", "eth_mxn", "xrp_mxn", "ltc_mxn" , "mana_mxn", "gnt_mxn", "bat_mxn", "dai_mxn"
            ];
            const url = "https://cors-anywhere.herokuapp.com/https://api-dev.bitso.com/v3/ticker/?book="
            for (const [index, value] of books.entries()) {
                const newLocal = "XMLHttpRequest";
                axios.get(url+value, {
                    mode: 'no-cors',
                    secure: false,
                    headers:{
                        "X-Requested-With": newLocal
                    } 
                }).then(result => {
                    this.setState({stateBooks: this.state.stateBooks.concat([result.data.payload]),
                    isLoading: false}
                    );
                })

            }
        }
      };

  

    componentDidMount(){
        if (this.state.isLoading){
            this.intervalId = setInterval(this.timer.bind(this), 1000);
            this.forceUpdateHandler();
        }
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    
    componentWillUnmount() {
        this.state.isLoading = true;
    }
        render() {
            if (this.state.isLoading) {
                return(
                    <>
                        <Col md={{span:2, offset:5}} sm="12">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </Col>
                    </>
                );
            }else{

                const currentDate =  moment().format('MMMM Do YYYY, h:mm:ss a');
                return(
                    <>
                        <Col md={{ span: 4, offset:2}}>
                            <Alert variant="success">
                                <Alert.Heading>Last update: {currentDate}</Alert.Heading>
                            </Alert>
                        </Col>
                            <Col md={{ span: 6}}>   
                            <Button onClick={() => { 
                                this.state.isLoading = true;
                                this.state.stateBooks = [];
                                this.forceUpdateHandler();
                                }}>Update
                            </Button>
                        </Col>
                        {this.state.stateBooks.map((book) => <BtxItem book={book}/>)}
                    </>
            )
            }
        }
};

export default BitsoApi;
