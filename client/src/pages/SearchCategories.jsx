import React from "react"
import { useState, useEffect } from "react";

const SearchCategories = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [isActiveFilter, setIsActiveFilter] = useState(false);
    
    useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await fetch("http://localhost:3000/api/categories");
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              console.log('Categorías recibidas:', data);
              setCategories(data);
          } catch (error) {
              console.error('Error fetching categories:', error);
              setError(error.message);
          }
      };

      fetchCategories();
  }, []);



  return (
    <div>
      <h1>Buscar Categorías</h1>
      <input
        type="text"
        placeholder="Buscar categoría..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

        <div>
          <label>
            <input
              type="checkbox"
              checked={isActiveFilter}
              onChange={(e) => setIsActiveFilter(e.target.checked)}
            />
            Solo Activas
          </label>
        </div>

      {error && <p style={{color: 'red'}}>Error: {error}</p>}

      <ul>
        {categories && categories.length > 0 ? (
            categories
                .filter((category) =>
                category.name.toLowerCase().includes(searchTerm.toLowerCase())
                && (!isActiveFilter || category.isActive)
                )
                .map((category) => (
                    <li key={category._id}>{category.name} {category.parentCategory ? `(Categoría Padre: ${category.parentCategory.name})` : ''} {category.isActive ? '(Activa)' : '(Inactiva)'}</li>
                ))
            ) : (
          <p>No hay categorías disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default SearchCategories;