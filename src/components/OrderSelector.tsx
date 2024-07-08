import * as React from 'react';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';

export default function OrderSelector({order, setOrder}) {
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        color="primary"
        endDecorator={<ArrowDropDown />}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Ordenar por
      </MenuButton>
      <Menu sx={{ minWidth: 120 }}>
        <MenuItem selected={order === 'asc'} onClick={() => { setOrder('asc') }}>Crescente</MenuItem>
        <MenuItem selected={order === 'desc'} onClick={() => { setOrder('desc') }}>Decrescente</MenuItem>
      </Menu>
    </Dropdown>
  );
}
