import React from 'react';

const Overview = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Overview</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 rounded-lg p-4 text-white">
          <h2 className="text-lg font-bold mb-2">Next Payout</h2>
          <p className="text-3xl font-bold">₹2,312.23</p>
          <p className="text-sm mt-2">Next payout date: Today, 04:00PM</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-bold mb-2">Amount Pending</h2>
          <p className="text-3xl font-bold">₹92,312.20</p>
          <p className="text-sm mt-2">23 Orders</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-bold mb-2">Amount Pending</h2>
          <p className="text-3xl font-bold">₹23,92,312.19</p>
          <p className="text-sm mt-2">23 Orders</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-8">Transactions | This Month</h2>
    </div>
  );
};

export default Overview;