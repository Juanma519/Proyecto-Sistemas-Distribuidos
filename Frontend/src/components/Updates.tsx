import React from 'react';

const updates = [
  {
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    title: 'Mindful Journeys Newsletter',
    action: 'Subscribe',
  },
  {
    image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    title: 'Accessibility Features',
    action: 'Explore',
  },
  {
    image: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    title: 'Relaxing Beats Playlist',
    action: 'Listen',
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    title: 'Nature Sounds Playlist',
    action: 'Listen',
  },
  {
    image: 'https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    title: 'Art Therapy Resources',
    action: 'Discover',
  },
];

const Updates: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Follow us for Updates</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {updates.map((update, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={update.image} alt={update.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-sm mb-2">{update.title}</h3>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 w-full">
                {update.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;