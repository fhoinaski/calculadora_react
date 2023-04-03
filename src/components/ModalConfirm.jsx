import { Modal, Button } from 'bootstrap';

export const ModalConfirm = ({ open, setOpen, title, message, onConfirm }) => {
  return (
    <Modal show={open} onHide={() => setOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Fechar
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
