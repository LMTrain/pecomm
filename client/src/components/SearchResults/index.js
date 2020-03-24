import React from "react";
import { Card, Row, Col} from 'reactstrap';
import "../SearchResults/style.css";


function SearchResults(props) {
  
  return (
    <Row>
      <Card className="item-display">
        <div className = "item-row-display">                    
            {props.Items.map(result => (
              <Col key={result.itemId} md="4">
                <div className="item-card">
                  <div className="img-container">                
                    <img 
                        key={result.itemId} 
                        alt={result.name} width="220" height="280" className="img-fluid" 
                        src={result.largeImage == null ? 'https://lmtrain.github.io/lm-images/assets/images/books5.jpg' : result.largeImage} />
                  </div>
                  <div>
                    <div className="content">
                      <p>{result.name}</p>
                      <b>Rating :</b> {result.customerRating}
                      <p><b>${result.salePrice}</b></p>
                    </div>
                    <span>
                      <button key={result.itemId} id={result.itemId} onClick={() => props.addItemToCart(result.itemId)} className="btn btn-success">Add to cart</button>
                      <span><button key={result.itemId} id={result.itemId} onClick={() => props.additemDetails(result.itemId)} className="btn btn-success">Item Details</button></span>
                      <span><button key={result.itemId} id={result.itemId} onClick={() => props.addItemToSaveForLater(result.itemId)} className="btn btn-success">Save For Later</button></span>                             
                    </span>                  
                  </div>
                </div>
              </Col> 
            ))}
        </div>
      </Card>
    </Row>
    
  );
  
}



export default SearchResults;
