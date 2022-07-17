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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styled from 'styled-components';

const StyledName = styled.h1`
  font-family: 'Edu VIC WA NT Beginner', cursive;
  padding-top: 10%;
  font-size: 72px;
`;

const StyledProfilePic = styled(Image)`
  padding-top: 4%;
  padding: 8%;
  width: 60%;
  height: 60%;
  max-width: 100%;
`;

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
        <Container fluid style={{ backgroundColor: '#00A8CC' }}>
          <Row className="justify-content-center">
            <Col
              md={{ span: 6, offset: 4 }}
              sm={{ span: 3, offset: 6 }}
              className="text-center"
            >
              <StyledName>{currDog[0].name}</StyledName>
            </Col>
          </Row>

          <Row className="text-center">
            <div>
              <Col md={{ span: 6, offset: 4 }}>
                <StyledProfilePic
                  src={currDog[0].imageUrl[0]}
                  alt=""
                  roundedCircle="true"
                />
              </Col>
            </div>
          </Row>
          <Row className="text-center">
            <Col>
              <div>
                <h3>{currDog.bio}</h3>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {currDog[0].imageUrl.slice(1).map((pic) => (
              <Col>
                <Image
                  src={pic}
                  alt=""
                  thumbnail="true"
                  style={{
                    paddingBottom: '3%',
                    margin: '8%',
                    height: '50%',
                    width: '40%',
                  }}
                />
              </Col>
            ))}
          </Row>
          <Tabs
            defaultActiveKey="dog"
            id="profile"
            className="mb-3"
            fill
            style={{ backgroundColor: 'orange' }}
          >
            <Tab eventKey="dog" title="About Pup">
              <Row>
                <h6>{currDog[0].bio}</h6>
                <Stack gap={4}>
                  <div>Size: {currDog[0].size} </div>
                  <div>Breed: {currDog[0].breed}</div>
                  <div>Gender: {currDog[0].gender}</div>
                </Stack>
              </Row>
            </Tab>
            <Tab eventKey="human" title="Human">
              <h4>Name: {currUser[0].name}</h4>
              <h4>Age: {currUser[0].age}</h4>
              <h4>email: {currUser[0].email}</h4>
            </Tab>
          </Tabs>
          <Row style={{ backgroundColor: 'orange' }}>
            <Accordion style={{ backgroundColor: 'orange' }}>
              <Accordion.Item
                eventKey="0"
                flush="true"
                style={{ backgroundColor: 'orange !important' }}
              >
                <Accordion.Header style={{ backgroundColor: 'orange' }}>
                  {' '}
                  About Me
                </Accordion.Header>
                <Accordion.Body>
                  <p>{currDog[0].bio}</p>
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
