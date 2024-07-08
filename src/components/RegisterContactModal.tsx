import { Alert, Autocomplete, Box, Button, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Input, Modal, ModalDialog, Option, Select, Stack } from '@mui/joy';
import React, { useEffect, useState } from 'react'
import { fromAddress, fromLatLng, setKey } from 'react-geocode';
import { useNavigate } from 'react-router-dom';

function RegisterContactModal({onClose, selectedContact, fetchContacts, modalOpen, setModalOpen}) {
  const [showAlert, setShowAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState("")

  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [phone, setPhone] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [number, setNumber] = useState("")
  const [street, setStreet] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [complement, setComplement] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  const [addressesSuggestions, setAddressesSuggestions] = useState([])

  const [autocompleteOpen, setAutocompleteOpen] = useState(false)

  const navigate = useNavigate()

  setKey("AIzaSyCSShSwdzxzjX0bRt3NsO3u12G7oPvnHBQ")

  const client = localStorage.getItem('client') 
  const uid = localStorage.getItem('uid') 
  const accessToken = localStorage.getItem('accessToken') 

  const clean = () => {
    localStorage.setItem('uid', "")
    localStorage.setItem('client', "")
    localStorage.setItem('accessToken', "")

    navigate("/entrar")
  }

  useEffect(() => {
    setName(selectedContact?.name)
    setCpf(selectedContact?.cpf)
    setPhone(selectedContact?.phone)

    setZipcode(selectedContact?.address.zipcode)
    setNumber(selectedContact?.address.number)
    setStreet(selectedContact?.address.street)
    setNeighborhood(selectedContact?.address.neighborhood)
    setCity(selectedContact?.address.city)
    setState(selectedContact?.address.state)
    setComplement(selectedContact?.address.complement)
    setLatitude(selectedContact?.address.latitude)
    setLongitude(selectedContact?.address.longitude)
  }, [selectedContact])

  const fetchCreate = (params) => {
    fetch(`http://localhost:3001/api/v1/contacts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'client': client || '',
        'uid': uid || '',
        'access-token': accessToken || ''
      },
      body: JSON.stringify(params)
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
      } else if (response.status == 422) {
        return response.json()
      } else {
        fetchContacts()
        setModalOpen(false)
      }
    })
    .then(data => {
      if (data && data['errors']) {
        Object.keys(data['errors']).forEach(function(key, index) {
          data['errors'][key] = key + ' ' + data['errors'][key];
        });        

        setAlertMessage(Object.values(data['errors']).join('. '))
        setShowAlert(true)
      }
    })
  }

  const fetchUpdate = (params) => {
    fetch(`http://localhost:3001/api/v1/contacts/${selectedContact?.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'client': client || '',
        'uid': uid || '',
        'access-token': accessToken || ''
      },
      body: JSON.stringify(params)
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
      } else if (response.status == 422) {
        return response.json()
      } else {
        fetchContacts()
        onClose()
        setModalOpen(false)
      }
    })
    .then(data => {
      if (data && data['errors']) {
        Object.keys(data['errors']).forEach(function(key, index) {
          data['errors'][key] = key + ' ' + data['errors'][key];
        });        

        setAlertMessage(Object.values(data['errors']).join('. '))
        setShowAlert(true)
      }
    })
  }

  const registerInApi = async () => {
    const params = {
      contact: {
        name: name,
        cpf: cpf,
        phone: phone,
        address_attributes: {
          zipcode: zipcode,
          number: number,
          street: street,
          neighborhood: neighborhood,
          city: city,
          state: state,
          complement: complement,
          latitude: latitude,
          longitude: longitude
        }
      }
    }

    if (!selectedContact) {
      fetchCreate(params)
    } else {
      fetchUpdate(params)
    }
  }

  const handleChangeSelect = (_, object) => {
    console.log(object)

    fetch(`http://localhost:3001/api/v1/via_cep/${object?.cep}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'client': client || '',
        'uid': uid || '',
        'access-token': accessToken || ''
      },
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
        setStreet(data?.logradouro)
        setNeighborhood(data?.bairro)
        setZipcode(data?.cep)
        setComplement(data?.complemento)
        setCity(data?.localidade)
        setState(data?.uf)
        setLatitude(object?.lat)
        setLongitude(object?.lng)
      }
    })
  }

  function validateCEP ( cep: string ) : boolean { 
    return /^\d{8}$/ . test ( cep. replace ( /[^\d]+/g , "" ) ) ; 
  }

  const addressesOptions = addressesSuggestions.map(address => {
    const components = address['address_components'] as []
    const validCep = components.find(component => {
      return validateCEP(component['long_name'])
    })

    if (validCep) {
      const lat = address['geometry']['location']['lat'] 
      const lng = address['geometry']['location']['lng']

      return { label: address['formatted_address'], cep: validCep['long_name'], lat: lat, lng: lng }
    }

    return null
  }).filter(e => e)


  console.log(addressesOptions)

  const handleAutocompleteChange = (event, value) => {
    fromAddress(value)
    .then(({ results }) => {
      // const { lat, lng } = results[0].geometry.location;
      setAddressesSuggestions(results);
    })
    .catch(() => {});
  }

  return (
    <div>
       <Modal open={modalOpen} onClose={() => {setModalOpen(false); setAlertMessage(''); setShowAlert(false); onClose()}}>
        <ModalDialog sx={{height: "75%", width: "50%"}}>
          <DialogTitle>{selectedContact?.name || "Novo Contato"} </DialogTitle>
          {showAlert && (
              <Alert 
                variant="soft"
                color="danger"
              >{alertMessage}</Alert>
            )}
          <DialogContent>
            <form
              onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();

                registerInApi()
                // setModalOpen(false);
              }}
            >
              <Stack spacing={2} sx={{overflow: 'auto'}}>
                <FormControl>
                  <FormLabel>Nome</FormLabel>
                  <Input autoFocus required value={name} onChange={event => { setName(event.target.value) }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Cpf</FormLabel>
                  <Input required value={cpf} onChange={event => { setCpf(event.target.value) }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input required value={phone} onChange={event => { setPhone(event.target.value) }} />
                </FormControl>
                <Divider />
                <FormControl>
                  <FormLabel>Pesquisar endereço</FormLabel>
                  <Autocomplete
                    required={!selectedContact}
                    placeholder="comece a digitar partes do endereço"
                    options={addressesOptions}
                    onInputChange={handleAutocompleteChange}
                    open={autocompleteOpen}
                    onOpen={() => {
                      setAutocompleteOpen(addressesOptions.length > 0)
                    }}
                    onClose={() => setAutocompleteOpen(false)}
                    filterOptions={(options) => options}
                    slotProps={{
                      input: {
                        autoComplete: 'password',
                      },
                    }}
                    onChange={handleChangeSelect}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Cep</FormLabel>
                  <Input disabled={true} variant="solid" required value={zipcode} onChange={event => { setZipcode(event.target.value) }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Número</FormLabel>
                  <Input required value={number} onChange={event => { setNumber(event.target.value) }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Rua</FormLabel>
                  <Input disabled={true} variant="solid" required value={street} onChange={event => { setStreet(event.target.value) }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Bairro</FormLabel>
                  <Input disabled={true} variant="solid" required value={neighborhood} onChange={event => { setNeighborhood(event.target.value) }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Cidade</FormLabel>
                  <Input disabled={true} variant="solid" required value={city} onChange={event => { setCity(event.target.value) }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Estado</FormLabel>
                  <Input disabled={true} variant="solid" required value={state} onChange={event => { setState(event.target.value) }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Complemento</FormLabel>
                  <Input value={complement} onChange={event => { setComplement(event.target.value) }} />
                </FormControl>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </div>
  )
}

export default RegisterContactModal
