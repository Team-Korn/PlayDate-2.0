import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { app, db } from '../../config/fbConfig';
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Profile = () => {
  // get current user uid to check for current dog
  const auth = getAuth(app);
  const user = auth.currentUser;

  // gets dog collection
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'dogs'));
        const dogData = [];
        querySnapshot.forEach((doc) => {
          dogData.push(doc.data());
        });
        setDogs(dogData);
      } catch (err) {
        collection.log(err, 'who let the dogs out?');
      }
    })();
  }, []);

  // shows owner's dog
  const currDog = dogs.filter((dog) => {
    return dog.ownerId === user.uid;
  });

  if (!dogs[0]) {
    console.log('No Dogs Here!');
  } else {
    return (
      <div style={{ backgroundColor: '#7ed7f0', padding: '20px' }}>
        <Container
          className=" justify-content-md-center"
          style={{
            backgroundColor: 'white',
            boxShadow: '0px 14px 80px #35375080',
            marginTop: '3em',
            borderRadius: '15px',
          }}
        >
          <Row className="position-relative">
            <Col className="justify-content-md-center ">
              <Image
                src={currDog[0].imageUrl[0]}
                style={{ width: '30%', height: '100%', marginLeft: '35%' }}
                thumbnail
                fluid
              />
            </Col>
          </Row>
          <Row className="d-flex">
            <Col>
              <h1 style={{ textAlign: 'center' }}>{currDog[0].name}</h1>
            </Col>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Col className="d-flex justify-content-around">
              <h5>Age: {currDog[0].age}</h5>
            </Col>
            <Col>
              {' '}
              <h5>{currDog[0].breed}</h5>
            </Col>
          </Row>
          <hr />
          <br />

          <Row className="d-flex align-content-center flex-wrap justify-content-center">
            <Col md={5} style={{ textAlign: 'center', paddingBottom: '3em' }}>
              {currDog[0].bio}
            </Col>
            {/* <div className="button-container"> */}
          </Row>

          <Row className="d-flex align-content-center justify-content-center  ">
            <Col>
              <Link to="/userSettings">
                <button
                  style={{
                    backgroundColor: '#FFB049',
                    marginLeft: '3%',
                    cursor: 'pointer',
                    borderRadius: '15px',
                  }}
                >
                  User Settings
                </button>
              </Link>
            </Col>
            <Col>
              <Link to="/dogSettings">
                <button
                  style={{
                    backgroundColor: '#FFB049',
                    cursor: 'pointer',
                    borderRadius: '15px',
                  }}
                >
                  Dog Settings
                </button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default Profile;
