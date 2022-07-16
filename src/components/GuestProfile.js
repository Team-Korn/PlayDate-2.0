import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, app } from '../config/fbConfig';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { getAuth } from 'firebase/auth';
import Card from 'react-bootstrap/Card';

const GuestProfile = () => {
  const [dogs, setDogs] = useState([]);
  const [users, setUsers] = useState([]);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;

  const currUser = users.filter((user) => {
    return user.uid === currentUser.uid;
  });
  console.log('WHAT IS currUser', currUser);

  // shows owner's dog
  console.log('DOGS: ', dogs);
  const currDog = dogs.filter((dog) => {
    return dog.ownerId === currUser[0].uid;
  });

  console.log('CURR DOG:', currDog);
  //grab all users from db
  useEffect(() => {
    (async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = [];
        querySnapshot.forEach((doc) => {
          userData.push(doc.data());
        });

        setUsers(userData);
      } catch (err) {
        console.log(err, 'who let the dogs out?');
      }
    })();
  }, []);

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

  return (
    <div>
      {currDog[0] && currUser[0] ? (
        <Container fluid>
          <div>
            <Image src={currDog[0].imageUrl[0]} alt="" roundedCircle="true" />
          </div>

          {currDog[0].imageUrl.slice(1).map((pic) => (
            <div>
              <Image src={pic} alt="" />
            </div>
          ))}
          <Row>
            <Col>
              <h1>{currDog[0].name}</h1>
            </Col>
          </Row>

          {/* <Row>
            <img scr={currDog.imageUrl} alt="" />
            <Image scr={currDog.imageUrl[2]} alt="" fluid="true" />
          </Row> */}
          <Row>
            <Stack gap={4}>
              <div className="bg-light border">{currDog[0].size}</div>
              <div className="bg-light border">{currDog[0].breed}</div>
              <div className="bg-light border">Gender</div>
            </Stack>
          </Row>
          <Row>
            <Accordion>
              <Accordion.Item eventKey="0" flush="true">
                <Accordion.Header> Owner Info</Accordion.Header>
                <Accordion.Body>
                  <h1>Hello</h1>
                  <p>{currUser[0].name}</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
        </Container>
      ) : (
        <div>
          <Spinner animation="grow" variant="info" />
        </div>
      )}
    </div>
  );
};
export default GuestProfile;
