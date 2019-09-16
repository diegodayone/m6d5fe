import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  state = {
    file: null,
    products: []
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.products.map((product, index) => <div key={index}>
            <img src={product.Image} height="200" width="200" />
            <h3>{product.name}</h3>
          </div>)}

          <input type="file" onChange={(input) => this.setState({ file: input.target.files[0] })}></input>
          <input type="button" onClick={this.createProduct} value="Create Product" ></input>
        </header>
      </div>
    );
  }

  componentDidMount = async () => {
    var resp = await fetch("http://localhost:3600/products");
    var json = await resp.json();
    this.setState({ products: json })
  }

  createProduct = async () => {
    // var data = new FormData();
    // data.append("image", this.state.file)
    // data.append("metadata", JSON.stringify({
    //   name: "From react",
    //   description: "somthing reacter",
    //   brand: "Samsung",
    //   price: 120,
    //   category: "tv",
    // }))

    var res = await fetch("http://localhost:3600/products", {
      method: "POST",
      body: JSON.stringify({
        name: "From react",
        description: "somthing reacter",
        brand: "Samsung",
        price: 120,
        category: "tv",
      }),
      headers: { "Content-Type": "application/json" }
    })

    var newlyCreatedProduct = await res.json()

    var data = new FormData();
    data.append("image", this.state.file)
    res = await fetch("http://localhost:3600/products/" + newlyCreatedProduct.ID + "/image", {
      method: "POST",
      body: data
    })

    var products = this.state.products;
    products.push(await res.json())
    this.setState({ products: products })
  }
}

export default App;
