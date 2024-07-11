import Layout from '@/components/DefaultLayout/DefaultLayout'
import React from 'react'
import TransactionTable from './components/TransactionTable'
import Overview from './components/Overview'

function page() {
  return (
    <Layout data = "Payments">
    <Overview></Overview>
    <TransactionTable></TransactionTable>
    </Layout>
  )
}

export default page