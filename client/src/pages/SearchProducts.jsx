import React, { useState, useEffect } from 'react';

function SearchProducts() {
  // 1. Estado para la lista "maestra" (TODOS los productos)
  const [allProducts, setAllProducts] = useState([]);
  
  // 2. Estado para los productos que SÍ se van a mostrar (los filtrados)
  const [filteredResults, setFilteredResults] = useState([]);
  
  // 3. Estado para lo que el usuario escribe
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados de carga (solo para la carga inicial)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- LÓGICA PRINCIPAL ---

  // 1. Carga INICIAL: Trae TODOS los productos UNA SOLA VEZ
  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // La URL base, sin "?search="
        const API_URL = 'http://localhost:3000/api/products'; 
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('No se pudieron cargar los productos');
        }

        const data = await response.json();
        setAllProducts(data); // Guarda la lista maestra
        setFilteredResults(data); // Al inicio, la lista filtrada es igual a la maestra

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []); // <-- El array vacío [] es clave: "Ejecutar solo al montar"

  
  // 2. FILTRADO: Se ejecuta CADA VEZ que 'searchTerm' o 'allProducts' cambian
  useEffect(() => {
    // Si la búsqueda está vacía, muestra todos los productos
    if (searchTerm.trim() === '') {
      setFilteredResults(allProducts);
      return;
    }

    // Lógica de filtrado en el frontend
    const results = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredResults(results);

  }, [searchTerm, allProducts]); // <-- "Escucha" cambios en estas dos variables


  // --- RENDERIZADO ---
  
  // El renderizado de "cargando" y "error" es solo para la carga inicial
  if (isLoading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="product-search-container">
      <h3>Buscador de Productos</h3>
      
      {/* --- Barra de Búsqueda (ya no necesitamos botón) --- */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Escribe para buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Solo actualiza el estado
          className="search-input"
        />
        {/* El botón "Buscar" ya no es necesario, ¡la búsqueda es en tiempo real! */}
      </div>

      {/* --- Zona de Resultados --- */}
      <div className="results-area">

        {/* Mensaje de "No se encontraron resultados" */}
        {/* Se muestra si el usuario SÍ buscó algo, pero no hubo coincidencias */}
        {searchTerm && filteredResults.length === 0 && (
          <p>No se encontraron resultados para "{searchTerm}"</p>
        )}

        {/* Lista de Resultados */}
        <ul className="search-results-list">
          {filteredResults.map(product => (
            <li key={product.id} className="result-item">
              <span className="result-name">{product.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchProducts;