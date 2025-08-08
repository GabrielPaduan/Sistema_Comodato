import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// 1. Definimos as props que o componente vai receber
interface SearchFieldProps {
  // Uma função que será chamada toda vez que o texto da busca mudar
  onSearchChange: (searchTerm: string) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({ onSearchChange }) => {
  // 2. Criamos um estado para guardar o valor do campo de busca
  const [searchTerm, setSearchTerm] = useState('');

  // 3. Função que é chamada a cada tecla digitada
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm); // Atualiza o estado local
    onSearchChange(newSearchTerm); // Notifica o componente pai sobre a mudança
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Pesquisar..."
      value={searchTerm} 
      onChange={handleInputChange} 
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};