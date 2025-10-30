import React, { useState } from 'react';

function SearchProducts() {
  // 1. Estado para el término de búsqueda (lo que escribe el usuario)
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. Estado para guardar los productos encontrados
  const [results, setResults] = useState([]);
  
  // 3. Estados para la experiencia de usuario (Carga y Errores)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // Para saber si ya se buscó algo

  // 4. Función que se ejecuta al hacer clic en el botón "Buscar"
  const handleSearch = async () => {
    // Evitar búsquedas vacías
    if (searchTerm.trim() === '') {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true); 

    try {

      const API_URL = `http://localhost:3000/api/products?search=${searchTerm}`;
      
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo completar la búsqueda.`);
      }

      const data = await response.json();

      setResults(data); 

    } catch (err) {
      setError(err.message);
      setResults([]); // Limpiar resultados si hay error
    } finally {
      setIsLoading(false);
    }
  };
  

  // 5. Renderizado (lo que se ve en la pantalla)
  return (
    <div className="product-search-container">
      <h3>Buscador de Productos</h3>
      
      {/* --- Barra de Búsqueda --- */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button 
          onClick={handleSearch} 
          disabled={isLoading} 
          className="search-button"
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* --- Zona de Resultados --- */}
      <div className="results-area">
        {/* Mensaje de Carga */}
        {isLoading && <p>Cargando resultados...</p>}

        {/* Mensaje de Error */}
        {error && <p className="error-message">Error: {error}</p>}

        {/* Mensaje de "No se encontraron resultados" */}
        {!isLoading && !error && hasSearched && results.length === 0 && (
          <p>No se encontraron resultados para "{searchTerm}"</p>
        )}

        {/* Lista de Resultados */}
        {results.length > 0 && (
          <ul className="search-results-list">
            {results.map(product => (
              <li key={product.id} className="result-item">
                <span className="result-name">{product.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchProducts;