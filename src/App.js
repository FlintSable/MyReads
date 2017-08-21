import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './components/BookSearch'
import BookList from './components/BookList'

export default class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount(){
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }

  updateShelf = (id, shelf) => {
    BooksAPI.update({id}, shelf).then(() => {
      this.fetchBooks()
    })
  } 

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={({history}) => (
            <BookSearch
              myBooks={this.state.books}
              onShelfChange={(id, shelf) => {
                this.updateShelf(id, shelf)
                history.push('/')
              }}
            />
          )} 
        />

        <Route
          exact
          path="/"
          render={()=> (
            <BookList
              books={this.state.books}
              onShelfChange={(id, shelf) => {
                this.updateShelf(id, shelf)
              }}
            />
          )}
        />
      </div>
    )
  }
}

