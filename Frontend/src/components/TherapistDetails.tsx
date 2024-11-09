import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Calendar, DollarSign, MessageCircle, Edit3 } from 'lucide-react';

const TherapistDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [therapist, setTherapist] = useState<any | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isWritingReview, setIsWritingReview] = useState<boolean>(false);
  const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>('');
  const reviewFormRef = useRef<HTMLDivElement | null>(null);
  const userType = localStorage.getItem('userType');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        setLoading(true);
        const therapistResponse = await fetch(`http://localhost:5001/psicologo/${id}`);
        const reviewsResponse = await fetch(`http://localhost:5001/psicologo/${id}/reviews`);

        if (therapistResponse.ok && reviewsResponse.ok) {
          const therapistData = await therapistResponse.json();
          const reviewsData = await reviewsResponse.json();

          setTherapist({
            ...therapistData,
            reviews: reviewsData.data,
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
            title: 'Licenciado en Psicología',
            price: 150,
          });
          setNewDescription(therapistData.descripcion);
        } else {
          setError('Error fetching therapist or reviews data');
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching therapist or reviews');
        setLoading(false);
      }
    };
    fetchTherapist();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (newReview.trim() === '') {
      alert('Por favor, escribe una reseña antes de publicar');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/psicologo/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contenido: newReview }),
      });

      if (response.ok) {
        const addedReview = await response.json();
        setTherapist((prevTherapist: any) => ({
          ...prevTherapist,
          reviews: [addedReview.data, ...(prevTherapist.reviews || [])],
        }));
        setNewReview('');
        setIsWritingReview(false);
      } else {
        console.error('Error al publicar la reseña');
        alert('Hubo un error al publicar la reseña. Verifica los datos y vuelve a intentar.');
      }
    } catch (error) {
      console.error('Error al publicar la reseña:', error);
      alert('Error de conexión. Verifica que el servidor esté corriendo.');
    }
  };

  const handleCancelReview = () => {
    setIsWritingReview(false);
    setNewReview('');
  };

  const handleWriteReviewClick = () => {
    setIsWritingReview(true);
    setTimeout(() => {
      reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveDescription = async () => {
    try {
      const response = await fetch(`http://localhost:5001/psicologo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descripcion: newDescription }),
      });

      if (response.ok) {
        setTherapist((prevTherapist: any) => ({
          ...prevTherapist,
          descripcion: newDescription,
        }));
        setIsEditingDescription(false);
      } else {
        console.error('Error al actualizar la descripción');
        alert('Hubo un error al actualizar la descripción. Verifica los datos y vuelve a intentar.');
      }
    } catch (error) {
      console.error('Error al actualizar la descripción:', error);
      alert('Error de conexión. Verifica que el servidor esté corriendo.');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!therapist) {
    return <p>No se encontró el terapeuta</p>;
  }

  const isOwnProfile = userType === 'psicologo' && userId === id;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={therapist.image} alt={therapist.nombre} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{therapist.title}</div>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">{`${therapist.nombre} ${therapist.apellido}`}</h1>
            <div className="mt-2 flex items-center">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="ml-1 text-gray-600">{therapist.reviews?.length || 0} reseñas</span>
            </div>
            <p className="mt-2 text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {therapist.ubicacion}
            </p>
            <div className="mt-4">
              {isEditingDescription ? (
                <>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
                    onClick={handleSaveDescription}
                  >
                    Guardar
                  </button>
                </>
              ) : (
                <div className="flex items-center">
                  <p className="text-gray-500">{therapist.descripcion}</p>
                  {isOwnProfile && (
                    <button
                      onClick={handleEditDescription}
                      className="ml-4 text-blue-500 hover:text-blue-600"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-8 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Especialidad</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {therapist.especialidad}
            </span>
          </div>
        </div>
        <div className="px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Consultas</h2>
          <div className="mt-2 flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <span>Disponible la próxima semana</span>
          </div>
          <div className="mt-2 flex items-center">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <span>${therapist.price} por sesión</span>
          </div>
          {!isOwnProfile && (
            <div className="mt-4 flex space-x-4">
              <Link
                to={`/chat/${therapist.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat con {therapist.nombre} {therapist.apellido}
              </Link>
              <button 
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Agendar Consulta
              </button>
              <button 
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleWriteReviewClick}
              >
                Escribir Reseña
              </button>
            </div>
          )}
        </div>
        <div className="px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Reseñas</h2>
          <div className="mt-4 space-y-4">
            {therapist.reviews?.length > 0 ? (
              therapist.reviews.slice(0, showAllReviews ? undefined : 2).map((review: any, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <p className="text-gray-600">{review.contenido}</p>
                  <p className="mt-2 text-sm text-gray-500">- Usuario anónimo</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay reseñas disponibles</p>
            )}
          </div>
          <div className="mt-4">
            {!showAllReviews && therapist.reviews?.length > 2 && (
              <button
                className="text-blue-500 hover:text-blue-600"
                onClick={() => setShowAllReviews(true)}
              >
                Mostrar todas las reseñas
              </button>
            )}
            {showAllReviews && (
              <button
                className="text-blue-500 hover:text-blue-600"
                onClick={() => setShowAllReviews(false)}
              >
                Mostrar menos reseñas
              </button>
            )}
          </div>

          {isWritingReview && (
            <div ref={reviewFormRef} className="mt-6">
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Escribe tu reseña aquí..."
              />
              <div className="mt-2 flex justify-between">
                <button
                  onClick={handleCancelReview}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReviewSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Publicar Reseña
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistDetails;
