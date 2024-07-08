import { Button, DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from '@mui/joy'
import React from 'react'

function ContactModal({onClose, contact, contactModalOpen, setContactModalOpen, onMarkerClick, onDeleteClick, onEditClick}) {
  const handleMarkerClick = () => {
		onMarkerClick()
		setContactModalOpen(false)
	}

	const handleDeleteClick = () => {
		onDeleteClick()
		setContactModalOpen(false)
	}

	const handleEditClick = () => {
		onEditClick()
		setContactModalOpen(false)
	}

  return (
    <div>
      <Modal open={contactModalOpen} onClose={() => {onClose(); setContactModalOpen(false)}}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            {/* <WarningRoundedIcon /> */}
            Contato
          </DialogTitle>
          <Divider />
          <DialogContent>
            {contact?.name}
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => handleDeleteClick()}>
              Excluir
            </Button>
            <Button variant="solid" color="primary" onClick={() => handleEditClick()}>
              Editar
            </Button>
            <Button variant="solid" color="success" onClick={() => handleMarkerClick()}>
              MARCAR
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  )
}

export default ContactModal
