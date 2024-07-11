"use client"
import Layout from '@/components/DefaultLayout/DefaultLayout';
import { useParams } from 'next/navigation';
import React from 'react';
import { transactions } from '../data';

function Page() {
  const { orderID } = useParams();

  console.log(orderID)

  // Find the transaction corresponding to the orderId
  const  transaction = transactions.find(transaction => transaction.orderId == orderID);


  return (
    <Layout data="Payment Details">
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-950 shadow-md rounded-lg p-6">
          {transaction ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <p className="text-gray-600">Order ID</p>
                  <p className="text-lg font-semibold">{transaction.orderId}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">Customer</p>
                  <p className="text-lg font-semibold">{transaction.customer}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">Date</p>
                  <p className="text-lg font-semibold">{transaction.date}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">Order Amount</p>
                  <p className="text-lg font-semibold">${transaction.orderAmount.toFixed(2)}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600">Status</p>
                  <p className="text-lg font-semibold capitalize">{transaction.status}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-red-500">Transaction not found for Order ID: {orderID}</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Page;
