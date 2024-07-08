import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/joy/Typography';


export default function Search({contacts, setPage, searchTerm, setSearchTerm, fetchContacts}) {
  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          fetchContacts()
        }}
      >
        <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <Input
              placeholder="Pesquise contatos por nome ou CPF"
              startDecorator={<SearchRoundedIcon />}
              value={searchTerm}
              name='search'
              onChange={event => {setSearchTerm(event.target.value)}}
              aria-label="Search"
            />
          </FormControl>
        </Stack>
      </form>
    </div>
  );
}
