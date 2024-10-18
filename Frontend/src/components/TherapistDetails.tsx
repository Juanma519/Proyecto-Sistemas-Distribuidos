import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Calendar, DollarSign, MessageCircle } from 'lucide-react';

const TherapistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock data for the therapist
  const therapist = {
    id,
    name: 'Dr. Emily Johnson',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    title: 'Licensed Clinical Psychologist',
    specialties: ['Cognitive Behavioral Therapy', 'Mindfulness', 'Stress Management'],
    description: 'Dr. Emily Johnson is a highly experienced psychologist with over 15 years of experience in helping individuals manage stress, anxiety, and depression. She is known for her compassionate approach and effective strategies that empower clients to improve their mental health and well-being.',
    location: '123 Therapy St, New York, NY 10001',
    price: 150,
    rating: 4.8,
    reviewCount: 120,
    reviews: [
      { author: 'Sarah P.', content: 'Dr. Johnson helped me through a very tough time. Her approach is caring and effective.' },
      { author: 'Mark L.', content: 'I highly recommend Dr. Johnson for anyone dealing with anxiety issues.' },
      { author: 'Lisa K.', content: 'Amazing experience. I felt understood and supported every step of the way.' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={therapist.image} alt={therapist.name} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{therapist.title}</div>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">{therapist.name}</h1>
            <div className="mt-2 flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-gray-600">{therapist.rating} ({therapist.reviewCount} reviews)</span>
            </div>
            <p className="mt-2 text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {therapist.location}
            </p>
            <p className="mt-4 text-gray-500">{therapist.description}</p>
          </div>
        </div>
        <div className="px-8 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Specialties</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {therapist.specialties.map((specialty, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {specialty}
              </span>
            ))}
          </div>
        </div>
        <div className="px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Consultation</h2>
          <div className="mt-2 flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <span>Available next week</span>
          </div>
          <div className="mt-2 flex items-center">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <span>${therapist.price} per session</span>
          </div>
          <div className="mt-4 flex space-x-4">
            <Link
              to={`/chat/${therapist.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat with Dr. Johnson
            </Link>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Book a Consultation
            </button>
          </div>
        </div>
        <div className="px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
          <div className="mt-4 space-y-4">
            {therapist.reviews.slice(0, showAllReviews ? undefined : 2).map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <p className="text-gray-600">{review.content}</p>
                <p className="mt-2 text-sm text-gray-500">- {review.author}</p>
              </div>
            ))}
          </div>
          {!showAllReviews && therapist.reviews.length > 2 && (
            <button
              className="mt-4 text-blue-500 hover:text-blue-600"
              onClick={() => setShowAllReviews(true)}
            >
              Show all reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistDetails;