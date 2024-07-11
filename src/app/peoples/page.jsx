import Layout from '@/components/DefaultLayout/DefaultLayout';
import React from 'react';

// Sample data for demonstration
const peopleData = [
  { id: 1, name: 'John Doe', age: 30, location: 'New York' },
  { id: 2, name: 'Jane Smith', age: 28, location: 'San Francisco' },
  { id: 3, name: 'James Brown', age: 35, location: 'Chicago' },
  { id: 4, name: 'Emily Davis', age: 25, location: 'Los Angeles' },
  // Add more people as needed
];

function Page() {
  return (
    <Layout data="Peoples">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Peoples</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {peopleData.map(person => (
            <div key={person.id} className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <p className="text-lg font-semibold">{person.name}</p>
              <p className="text-gray-600">Age: {person.age}</p>
              <p className="text-gray-600">Location: {person.location}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Page;
