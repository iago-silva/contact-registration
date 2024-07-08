import * as React from 'react';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Dropdown, FormControl, FormLabel, IconButton, Input, Menu, MenuButton, MenuItem, Modal, ModalClose, ModalDialog } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ColorSchemeToggle from './ColorSchemeToggle.tsx';
import { useNavigate } from 'react-router-dom';
import { cleanup } from '@testing-library/react';

export default function HeaderSection() {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [password, setPassword] = React.useState('')

  const navigate = useNavigate()
  
  const client = localStorage.getItem('client') 
  const uid = localStorage.getItem('uid') 
  const accessToken = localStorage.getItem('accessToken')   

  const params = {
    'client': client,
    'uid': uid,
    'access-token': accessToken 
  }

  const clean = () => {
    localStorage.setItem('uid', "")
    localStorage.setItem('client', "")
    localStorage.setItem('accessToken', "")

    navigate("/entrar")
  }

  const handleDeleteAccount = () => {
    setModalOpen(false)

    // first try loguin with password

    fetch(`http://localhost:3001/auth`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(response => {
      if (response.status !== 401) {
        clean()
      } else {
        // delete failed
      }
    })
  }

  const handleSignout = () => {
    fetch(`http://localhost:3001/api/v1/contacts`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(() => {
      clean()
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        backgroundColor: 'background.body',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <IconButton size="sm" variant="soft">
          <MapsHomeWorkIcon />
        </IconButton>
        <Typography component="h1" fontWeight="xl">
          Cadastro de Contatos
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Box
          sx={{
            gap: 1,
            alignItems: 'center',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <Box sx={{ minWidth: 0, flex: 1 }}>
          <Dropdown>
            <MenuButton>
              <Typography level="body-xs">{localStorage.getItem('uid')}</Typography>
            </MenuButton>
            <Menu>
              <MenuItem onClick={() => { setModalOpen(true) }}>Excluir conta</MenuItem>
              <MenuItem onClick={() => { handleSignout()}}>Sair</MenuItem>
            </Menu>
          </Dropdown>
          </Box>
        </Box>
        <ColorSchemeToggle sx={{ alignSelf: 'center' }} />
      </Box>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            {/* <WarningRoundedIcon /> */}
            Excluir conta
          </DialogTitle>
          <Divider />
          <DialogContent>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input type='password' required value={password} onChange={event => { setPassword(event.target.value) }} />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => handleDeleteAccount()}>
              Excluir
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Box>
  );
}
