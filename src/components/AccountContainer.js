import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
import { transactions } from '../transactionsData'

class AccountContainer extends Component {
  state ={
    transactions: transactions,
    searchTerm: ''
  }

  getTransactions=() => {
    fetch('https://boiling-brook-94902.herokuapp.com/transactions')
      .then(resp => resp.json())
      .then(transactions => this.setState({ transactions }))
  }

  componentDidMount () {
    this.getTransactions()
  }
  // get a default state working with the data imported from TransactionsData
  // use this to get the functionality working
  // then replace the default transactions with a call to the API

  handleChange=(event) => {
    this.setState({ searchTerm: event.target.value })
  }

  render () {
    const filterTransactions = this.state.transactions.filter(transaction => {
      if (transaction.description.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      ) {
        return transaction
      }
    })
    return (
      <div>
        <Search handleChange={this.handleChange}
          searchTerm={this.state.searchTerm} 
        />
        <TransactionsList
          transactions={filterTransactions}
        />
      </div>
    )
  }
}

export default AccountContainer
