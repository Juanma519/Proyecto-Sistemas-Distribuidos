
import {  Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// ... (keep the existing imports and useState declarations)

const SearchTherapists: React.FC = () => {
  // ... (keep the existing code)

  const therapists = [
    {
      id: '1',
      name: 'Dr. Mindful',
      distance: '1.5 km from your location',
      consultation: 'Free Consultation',
      insurance: 'Insurance Accepted',
      therapyType: 'Cognitive Behavioral Therapy',
      languages: 'English, Spanish',
      rating: 4.8,
      reviews: 120,
      price: 150,
      tags: ['Hot deal', 'Popular'],
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: '2',
      name: 'Zen Therapy Center',
      distance: '2.2 km from your location',
      consultation: 'Free initial consultation',
      therapyType: 'Mindfulness-Based Therapy',
      price: 120,
      sessions: 3,
      rating: 4.5,
      reviews: 85,
      tags: ['Popular', 'Limited spots'],
      image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ... (keep the existing JSX for filters and search results header) */}
      
      <div className="space-y-6">
        {therapists.map((therapist) => (
          <div key={therapist.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex">
              <img src={therapist.image} alt={therapist.name} className="w-32 h-32 object-cover rounded-lg mr-6" />
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{therapist.name}</h3>
                    <p className="text-sm text-gray-600">{therapist.distance}</p>
                    <p className="text-sm text-gray-600">{therapist.consultation} • {therapist.insurance}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{therapist.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">({therapist.reviews} reviews)</span>
                    </div>
                    <Link
                      to={`/therapist/${therapist.id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 mt-2 inline-block"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm"><strong>Therapy Type:</strong> {therapist.therapyType}</p>
                  <p className="text-sm"><strong>Languages Spoken:</strong> {therapist.languages}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    {therapist.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${therapist.price}</p>
                    <p className="text-sm text-gray-600">per session</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ... (keep the existing pagination JSX) */}
    </div>
  );
};

export default SearchTherapists;