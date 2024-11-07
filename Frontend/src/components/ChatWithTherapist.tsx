import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importación necesaria para los enlaces

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
}

interface Therapist {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  ubicacion: string;
}

const ChatWithTherapist: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: 'Dr. Emily Watson', lastMessage: 'Can we reschedule?' },
    { id: 2, name: 'Dr. Michael Scott', lastMessage: 'Thank you for the update.' },
    { id: 3, name: 'Dr. Olivia Martinez', lastMessage: 'Looking forward to our session.' },
  ]);

  const handleSelectChat = (id: number) => {
    setSelectedChat(id);
    setShowSearchBar(false);
    setMessages([
      { id: 1, sender: 'User', content: 'Hi Dr. Watson, I wanted to discuss our last session...' },
      { id: 2, sender: 'Dr. Watson', content: 'Of course, let’s talk about it. What are your main concerns?' },
    ]);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, sender: 'User', content: inputValue }]);
      setInputValue('');
    }
  };

  const handleNewChat = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      alert('Por favor ingrese un nombre para buscar');
      return;
    }

    try {
      // Realizar la solicitud al servidor para buscar psicólogos en la base de datos
      const response = await fetch(`http://localhost:5001/filtrarPsicologos?search=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTherapists(data.data); // Almacenar los resultados en el estado
      } else {
        alert('No se encontraron resultados');
      }
    } catch (error) {
      console.error('Error durante la búsqueda:', error);
      alert('Hubo un problema al intentar buscar');
    }
  };

  const handleStartChatFromSearch = (therapist: Therapist) => {
    const newChat = {
      id: chats.length + 1,
      name: `${therapist.nombre} ${therapist.apellido}`,
      lastMessage: 'Chat iniciado',
    };
    setChats((prevChats) => [...prevChats, newChat]);
    handleSelectChat(newChat.id);
  };

  return (
    <div style={styles.chatContainer}>
      {/* Chat List */}
      <div style={styles.chatListContainer}>
        <div style={styles.chatListHeader}>
          <h2 style={styles.chatListTitle}>Chats</h2>
          <button style={styles.newChatButton} onClick={handleNewChat}>
            Nuevo Chat
          </button>
        </div>

        {showSearchBar && (
          <div style={styles.searchBarContainer}>
            <div style={styles.searchInputContainer}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ingrese el nombre del psicólogo"
                style={styles.input}
              />
              <button style={styles.searchButton} onClick={handleSearch}>
                Buscar
              </button>
            </div>
            {/* Mostrar los resultados de la búsqueda */}
            <div style={styles.searchResultsContainer}>
              {therapists.length > 0 ? (
                therapists.map((therapist) => (
                  <div key={therapist.id} style={styles.therapistCard}>
                    <h3 style={styles.therapistName}>{`${therapist.nombre} ${therapist.apellido}`}</h3>
                    <p style={styles.therapistInfo}>Especialidad: {therapist.especialidad}</p>
                    <p style={styles.therapistInfo}>Ubicación: {therapist.ubicacion}</p>
                    <div style={styles.therapistActions}>
                      <button
                        style={styles.startChatButton}
                        onClick={() => handleStartChatFromSearch(therapist)}
                      >
                        Iniciar Chat
                      </button>
                      <Link
                        to={`/therapist/${therapist.id}`}
                        style={styles.viewProfileButton}
                      >
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#666' }}>No se encontraron resultados</p>
              )}
            </div>
          </div>
        )}

        <ul style={styles.chatList}>
          {chats.map((chat) => (
            <li
              key={chat.id}
              style={styles.chatItem}
              onClick={() => handleSelectChat(chat.id)}
            >
              <strong>{chat.name}</strong>
              <p>{chat.lastMessage}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div style={styles.chatArea}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div style={styles.chatHeader}>
              <h3>Conversación con {chats.find((chat) => chat.id === selectedChat)?.name}</h3>
            </div>

            {/* Chat Messages */}
            <div style={styles.messagesContainer}>
              {messages.map((message) => {
                const isUser = message.sender === 'User';
                return (
                  <div
                    key={message.id}
                    style={{
                      ...styles.message,
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                      backgroundColor: isUser ? '#e2e2cc' : '#f0f0f0',
                    }}
                  >
                    <strong>{message.sender}:</strong> {message.content}
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <div style={styles.inputContainer}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                style={styles.input}
              />
              <button onClick={handleSendMessage} style={styles.sendButton}>
                Enviar
              </button>
            </div>
          </>
        ) : (
          <div style={styles.noChatSelected}>
            <h4>Selecciona un chat para empezar a escribir</h4>
          </div>
        )}
      </div>
    </div>
  );
};

// Estilos en línea para los componentes ajustados para una vista más balanceada
const styles = {
  chatContainer: {
    display: 'flex',
    height: '85vh',
    maxHeight: '85vh',
    margin: '20px 10px',
  },
  chatListContainer: {
    width: '22%',
    backgroundColor: '#e5e7ec',
    padding: '10px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    overflowY: 'auto' as const,
    marginBottom: '10px',
  },
  chatListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  chatListTitle: {
    fontSize: '18px',
    fontWeight: '700',
  },
  newChatButton: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  searchBarContainer: {
    marginBottom: '12px',
  },
  searchInputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
  },
  input: {
    flex: 1,
    padding: '6px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  searchButton: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  searchResultsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  therapistCard: {
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
  },
  therapistName: {
    fontSize: '16px',
    fontWeight: '700',
  },
  therapistInfo: {
    fontSize: '14px',
    color: '#666',
  },
  therapistActions: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  startChatButton: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  viewProfileButton: {
    backgroundColor: '#8e8e8e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  chatList: {
    listStyleType: 'none' as const,
    padding: 0,
  },
  chatItem: {
    padding: '6px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    marginBottom: '8px',
    cursor: 'pointer',
    boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '10px',
    backgroundColor: '#ffffff',
    overflowY: 'hidden' as const,
    marginBottom: '10px',
  },
  chatHeader: {
    padding: '10px',
    backgroundColor: '#f7f8fa',
    boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center' as const,
    fontSize: '16px',
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '10px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  message: {
    padding: '8px',
    borderRadius: '10px',
    maxWidth: '70%',
    fontSize: '14px',
  },
  inputContainer: {
    display: 'flex',
    padding: '8px',
    backgroundColor: '#f7f8fa',
  },
  sendButton: {
    marginLeft: '8px',
    padding: '6px 14px',
    borderRadius: '8px',
    backgroundColor: '#4caf50',
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
    fontSize: '14px',
  },
  noChatSelected: {
    textAlign: 'center' as const,
    marginTop: '20px',
    color: '#666',
  },
};

export default ChatWithTherapist;






