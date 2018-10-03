import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'


class AccountContainer extends Component {

  state = {
    query: '',
    transactions: []

  }

    // get a default state working with the data imported from TransactionsData
    // use this to get the functionality working
    // then replace the default transactions with a call to the API

  handleSearch = (searchTerm) => {
    this.setState({query: searchTerm})
    // your code here
  }

  componentDidMount() {
    fetch('https://boiling-brook-94902.herokuapp.com/transactions')
      .then(resp => resp.json())
      .then(transactions => this.setState({transactions}))
  }




  render() {

    const filteredTransactions =
      this.state.transactions.filter(transaction => {
        return transaction.category.toLowerCase().includes(this.state.query.toLowerCase()) || transaction.description.toLowerCase().includes(this.state.query.toLowerCase()) 
      })


    return (
      <div>
        <Search handleSearch={this.handleSearch}/>
        <TransactionsList transactions={filteredTransactions}/>
      </div>
    )
  }
}

export default AccountContainer
