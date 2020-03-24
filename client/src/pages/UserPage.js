import React, { Component } from "react";
import "./themestyle.css";
import { Card, Row, Col} from 'reactstrap';
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import SearchResults from '../components/SearchResults';
import ItemDetails from '../components/ItemDetails';

var userArray = []
var membername = ""
var userName =""
var usertheme = "";
var divStyle = {};
var redirectOption = " "

class UserPage extends Component {
  
  state = {    
    user:[],
    userSettings: [],
    userArray: [],
    userCart: [],
    userTotalItems: 0,
    userName: this.props.currentUser,
    redirect: false,    
  };

  componentWillMount() {
    this.loadUserData();    
  }

  loadUserData = () => {
    this.setState({
      userName: this.props.currentUser
    })
    userName = this.state.userName
  
    const currentAccount = {     
      userName,          
    }
    this.loadAPIgetUser(currentAccount.userName);
  }

  loadAPIgetUser = (id) => {
    const app = this;
    id = userName
    API.getUser({      
      userName: userName,               
    })
    .then(function(res){
      return new Promise(function(resolve, reject){
        app.setState({ user: res.data })
        resolve(true);
      })
    }).then(function(){
      userArray = [...app.state.user]
      usertheme = userArray[0].userTheme
      membername = userArray[0].memberName
      app.userTheme(usertheme);
    })
    .catch(err => console.log(err));
  }

  userTheme = (id) => { 
    divStyle = {
      color: userArray[0].colorDb,
      textAlign: userArray[0].textalignDb,
      fontSize: userArray[0].divfontsizeDb,
      fontFamily: userArray[0].fontfamilyDb,
    };
    this.props.setTheme(id)    
  }

  
  // GETTING USERS INFO FROM DB
  userCart = () => {
    this.loadAPIgetUser(userArray[0].userName)

  }

  logOutPage = () => {    
    redirectOption = "logOut"
    this.props.setTheme("theme0")
    this.props.logOut()
      this.setState({
        redirect: true,
      })
  }  

  settingButton = () => {
    redirectOption = "settings"
    this.setState({
      redirect: true,       
    })    
  }
  
  todaysDeal = () => {
    redirectOption = "todaysDeal"
    this.setState({
      redirect: true,       
    })    
  }
  
  userCartPage = () => {
    redirectOption = "usercartpage"
    this.setState({
      redirect: true,       
    })    

  }
  

  render() {    
    if (this.state.redirect) {
      switch(redirectOption){
        case "logOut":
            localStorage.clear();
          return <Redirect to="/"/>;                 
        case "settings":
          return <Redirect to='/Settings' />;                 
        case "todaysDeal":
          return <Redirect to='/TodaysDeal' />;
        case "usercartpage":
          return <Redirect to='/Cart' />;             
        default:            
          break;
      }
    }
   
    return (
      <div>      
        <Row>              
          <Col size="md-10">
            <div style={divStyle}><b> Welcome {membername}!</b></div>
          </Col>
          <Col size="md-2">
            <div className="lineitems">            
                <span><button type="submit" className="btn btn-success" onClick={() => this.settingButton()}>Settings</button></span>
                <button type="submit" className="btn btn-success" onClick={() => this.todaysDeal()}>Todays Deal</button>
                <button type="submit" className="btn btn-success" onClick={() => this.logOutPage()}>Sign Out</button>
            </div>        
          </Col>
        </Row>
        {/* <Container style={{ marginTop: 60 }}> */}
        <div id="message"></div>
        <Row>  
          <Col md="8">
          { this.props.Items.length !== 0 && 
              <ItemDetails cart={this.props.cart} 
              saveForLater={this.props.saveForLater} 
              detailItem={this.props.detailItem} 
              addItemToCart={this.props.addItemToCart} 
              addItemToSaveForLater={this.props.addItemToSaveForLater} 
              additemDetails={this.props.additemDetails}/>
            }          
            { this.props.Items.length !== 0 && 
              <SearchResults userName={this.state.userName} 
              Items={this.props.Items} 
              cart={this.props.cart} 
              saveForLater={this.props.saveForLater} 
              totalItems={this.props.totalItems} 
              totalSavedItems={this.props.totalSavedItems} 
              detailItem={this.props.detailItem} 
              addItemToCart={this.props.addItemToCart} 
              addItemToSaveForLater={this.props.addItemToSaveForLater} 
              additemDetails={this.props.additemDetails}/>
            }          
          </Col>

          <Col md="4">          
            <div className="gap"></div>            
              <Row>
              <Col size="md-4">
                <Card className="contents-r2-c2">
                  <div className="inside-upage-box" onClick={() => this.userCartPage()}>                        
                    <div className="img-container">
                      <div><b>Cart</b><span>...</span><b>{this.props.totalItems}</b></div>
                    </div>                  
                  </div>
                  <div className="upage-box-content">
                    <Row>
                      {this.props.cart.map(cart => (
                        <span key={cart[0].itemId}>
                          <img alt={cart[0].name} width="80" height="100" className="img-fluid" src={cart[0].largeImage == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : cart[0].largeImage} />
                          <button key={cart[0].itemId} onClick={() => this.props.deleteItem(cart[0].itemId)} className="btn btn-success">Delete</button>
                          <p><b>Item Name             :</b> {cart[0].name}</p>
                          <b>Price         :</b> ${cart[0].salePrice}
                          <p>{cart[0].itemId}</p>
                        </span>
                      ))}
                    </Row>               
                  </div>
                </Card>                  
                </Col>             
                <Col size="md-4">
                  <Card className="contents-r2-c1">
                    <div className="inside-upage-box">
                      <div className="img-container">
                        <div><b>SavedItems</b><span>..</span><b>{this.props.totalSavedItems}</b></div>
                      </div>                  
                    </div>
                    <div className="upage-box-content">
                      <Row>
                        {this.props.saveForLater.map(saveForLater => (
                            <Col key={saveForLater[0].itemId} >
                            <img alt={saveForLater[0].name} width="80" height="100" className="img-fluid" src={saveForLater[0].largeImage == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : saveForLater[0].largeImage} />
                            <p><b>Item Name             :</b> {saveForLater[0].name}</p>
                            <b>Price         :</b> ${saveForLater[0].salePrice}
                          </Col>
                        ))}
                      </Row>                      
                    </div>
                  </Card>
                </Col>
                
                {/* <Col size="md-4">
                  <Card className="contents-r2-c3">
                    <div className="inside-upage-box">
                      <div className="img-container">
                        <div><b>Orders</b><span>...</span><b>{this.props.totalItems}</b></div>
                      </div>                  
                    </div>
                    <div className="upage-box-content">
                      <Row>
                        {this.props.cart.map(cart => (
                          <div key={cart[0].itemId}>
                            <img alt={cart[0].name} width="80" height="100" className="img-fluid" src={cart[0].largeImage == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : cart[0].largeImage} />
                            <p><b>Item Name             :</b> {cart[0].name}</p>
                            <b>Price         :</b> ${cart[0].salePrice}
                          </div>
                        ))}
                      </Row>               
                    </div>                      
                  </Card>
                </Col>                            */}
              </Row>            
            </Col>            
            
          </Row>          
        {/* </Container> */}
      </div>
    );
  }
}

export default UserPage;





