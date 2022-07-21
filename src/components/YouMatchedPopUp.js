import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// import React, { useState } from 'react';

// ----- shows pop up of matched! ------
const MatchPopUp = (props) => {
  console.log('This is props: ', props);
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>You Matched with {props.dog.name}!</Modal.Title>
      </Modal.Header>

      <Modal.Body>Go to your messages to say hi!</Modal.Body>

      <Modal.Footer>
        <Link to="/chat">
          <Button
            variant="outline-danger"
            onClick={console.log('Messages button clicked')}
          >
            Messages
          </Button>
        </Link>
        <Link to="/home">
          <Button variant="outline-success" onClick={props.onClose}>
            Return to Home
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default MatchPopUp;

// const [show, setShow] = useState(false);
// // console.log('match pop up was used!');
// // console.log('show: ', show);
// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);
// return (
//   <>
//     <Button variant="outline-success" onClick={handleShow}>
//       Like
//     </Button>

//     <Modal
//       show={show}
//       onHide={handleClose}
//       backdrop="static"
//       keyboard={false}
//     >

/*
return (
  <div>
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thanks!</Modal.Title>
      </Modal.Header>
      <Modal.Body>YOU MATCHED!</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={handleClose}>
          Cancel
        </Button>
        <Link to="/chat">
          <Button variant="outline-success">Confirm</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  </div>
);
*/
