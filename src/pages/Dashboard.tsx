import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import NavBar from '../components/NavBar.tsx';
import RentalCard from '../components/RentalCard.tsx';
import HeaderSection from '../components/HeaderSection.tsx';
import Search from '../components/Search.tsx';
import Filters from '../components/Filters.tsx';
import Pagination from '../components/Pagination.tsx';
import { useNavigate } from 'react-router-dom';
import RegisterContactModal from '../components/RegisterContactModal.tsx';
import { APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';
import { Button, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Input, Modal, ModalDialog } from '@mui/joy';
import ContactModal from '../components/ContactModal.tsx';

export default function Dashboard() {
  const [contacts, setContacts] = React.useState([])
  const [modalOpen, setModalOpen] = React.useState(false)
  const [contactModalOpen, setContactModalOpen] = React.useState(false)
  const [selectedContact, setSelectedContact] = React.useState(null)
  const [markerPosition, setMarkerPosition] = React.useState<{lat: number, lng:  number} | null>(null)
  const [order, setOrder] = React.useState('asc')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [totalPages, setTotalPages] = React.useState(0)
  const [page, setPage] = React.useState(1)

  const navigate = useNavigate()

  const client = localStorage.getItem('client') 
  const uid = localStorage.getItem('uid') 
  const accessToken = localStorage.getItem('accessToken') 

  const clean = () => {
    localStorage.setItem('uid', "")
    localStorage.setItem('client', "")
    localStorage.setItem('accessToken', "")
    
    navigate("/entrar")
  }

  const fetchContacts = () => {
    fetch(`http://localhost:3001/api/v1/contacts?order=${order}&search=${searchTerm}&page=${page}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'client': client || '',
        'uid': uid || '',
        'access-token': accessToken || ''
      }
    })
    .then(response => {
      const uid = response.headers.get('uid')
      const client = response.headers.get('client')
      const accessToken = response.headers.get('access-token')

      if (uid && client && accessToken) {
        localStorage.setItem('uid', uid || "");
        localStorage.setItem('client', client || "");
        localStorage.setItem('accessToken', accessToken || "");
      }

      return response
    })
    .then(response => {
      if (response.status == 401) {
        clean()
      } else {
        return response.json()
      }
    })
    .then(data => {
      if (data) {
        setContacts(data?.contacts)
        setTotalPages(data?.total_pages)
      }
    })
  }

  React.useEffect(() => {
    fetchContacts()
  }, [])

  React.useEffect(() => {
    fetchContacts()
  }, [order, page, searchTerm])


  const map = useMap()

  if (!client || !uid || !accessToken) {
    clean()
  }

  const cards = contacts?.map(contact => {
    return <RentalCard
      contact={contact}
      onClick={() => { 
        setSelectedContact(contact)
        setContactModalOpen(true)
      }}
      key={contact['cpf']}
    />
  })

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar />
      <Box
        component="main"
        sx={{
          height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
          display: 'grid',
          gridTemplateColumns: { xs: 'auto', md: '60% 40%' },
          gridTemplateRows: 'auto 1fr auto',
        }}
      >
        <Stack
          sx={{
            backgroundColor: 'background.surface',
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            minHeigh: '100%'
          }}
        >
          <HeaderSection />
          <Search contacts={contacts} setPage={setPage} searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetchContacts={fetchContacts}/>
        </Stack>
        <Box
          sx={{
            gridRow: 'span 3',
            display: { xs: 'none', md: 'flex' },
            backgroundColor: 'background.level1',
            backgroundSize: 'cover',
            backgroundImage:
              'url("https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3731&q=80")',
          }}
        >
            <Map
              style={{width: '100vw', height: '100vh'}}
              defaultCenter={{lat: -9.3951125, lng: -40.5513113}}
              defaultZoom={13.96}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              <Marker position={markerPosition} />
            </Map>
        </Box>
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Filters setModalOpen={setModalOpen} order={order} setOrder={setOrder} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Stack spacing={2} sx={{ overflow: 'auto' }}>
            {cards}
          </Stack>
        </Stack>
        {/* {contacts?.length > 10 && ( */}
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        {/* )} */}
      </Box>

      <RegisterContactModal onClose={() => { console.log('uhul'); setSelectedContact(null) }} selectedContact={selectedContact} fetchContacts={fetchContacts} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      <ContactModal 
        contact={selectedContact} 
        contactModalOpen={contactModalOpen} 
        setContactModalOpen={setContactModalOpen} 
        onClose={() => { setSelectedContact(null) }}
        onMarkerClick={() => {
          if (selectedContact) {
            const position = {
              lat: parseFloat(selectedContact['address']['latitude']), 
              lng: parseFloat(selectedContact['address']['longitude'])
            }

            setMarkerPosition(position)

            map?.setZoom(13.96)
            map?.setCenter(position)
          }

          setSelectedContact(null)
        }}
        onDeleteClick={() => {
          fetch(`http://localhost:3001/api/v1/contacts/${selectedContact.id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'client': client || '',
              'uid': uid || '',
              'access-token': accessToken || ''
            }
          })
          .then(response => {
            const uid = response.headers.get('uid')
            const client = response.headers.get('client')
            const accessToken = response.headers.get('access-token')

            if (uid && client && accessToken) {
              localStorage.setItem('uid', uid || "");
              localStorage.setItem('client', client || "");
              localStorage.setItem('accessToken', accessToken || "");
            }

            return response
          })
          .then(response => {
            if (response.status == 401) {
              clean()
            } else {
              setPage(1)
              fetchContacts()
            }
          })

          setSelectedContact(null)
        }}
        onEditClick={() => {
          setModalOpen(true)
        }}
      />
    </CssVarsProvider>
  );
}
