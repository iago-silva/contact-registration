import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/joy/Stack';
import Slider, { sliderClasses } from '@mui/joy/Slider';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import CountrySelector from './CountrySelector.tsx';
import OrderSelector from './OrderSelector.tsx';
import { Add } from '@mui/icons-material';

function valueText(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

export default function Filters({setModalOpen, order, setOrder, searchTerm, setSearchTerm}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Stack
      useFlexGap
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      justifyContent={{ xs: 'space-between' }}
      flexWrap="wrap"
      sx={{ minWidth: 0 }}
    >
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setModalOpen(true)}
      >
        Novo Contato
      </Button>
      <OrderSelector order={order} setOrder={setOrder} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Stack useFlexGap spacing={3} sx={{ p: 2 }}>
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <FormControl>
            <FormLabel>Nome ou CPF</FormLabel>
            <Input autoFocus required value={searchTerm} onChange={event => { setSearchTerm(event.target.value) }} />
          </FormControl>
        </Stack>
      </Drawer>
    </Stack>
  );
}
