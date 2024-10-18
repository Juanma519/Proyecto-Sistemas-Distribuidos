import React from 'react';

const therapists = [
  {
    name: 'Dr. Mindful (PhD)',
    specialty: 'Mindful Meals',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'Today',
  },
  {
    name: 'Mindful Moments (MSW)',
    specialty: 'Mindful Movement Clinic',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'Tomorrow',
  },
  {
    name: 'Mindful Thoughts (LPC)',
    specialty: 'Mindful Minds',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'This week',
  },
  {
    name: 'Mindful Journeys (LMFT)',
    specialty: 'Mindful Moments Clinic',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    availability: 'Next week',
  },
];

const TopTherapists: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Top- Your area</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {therapists.map((therapist, index) => (
          <div key={index} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
            <img src={therapist.image} alt={therapist.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{therapist.name}</h3>
              <p className="text-sm text-gray-600">{therapist.specialty}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-blue-500">{therapist.availability}</span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600">
                  Book now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTherapists;