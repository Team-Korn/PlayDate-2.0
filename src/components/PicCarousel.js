import React, { useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/fbConfig';

// import './styles.css';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 100%;
  background-color: #683bb7;
  color: #fff;
  // margin: 0 15px;
  // font-size: 4em;
`;

const StyledCarousel = styled.div`
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vh;
`;

const PicCarousel = () => {
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
      } catch (err) {}
    })();
  }, []);
  console.log('DOGS: ', dogs);
  // const addItem = () => {
  //   const nextItem = Math.max(1, items.length + 1);
  //   setItems([...items, nextItem]);
  // };

  // const removeItem = () => {
  //   const endRange = Math.max(0, items.length - 1);
  //   setItems(items.slice(0, endRange));
  // };
  const images = dogs.map((dog) => {
    return dog;
  });
  console.log('DOGS', images);

  const dogImg = images.map((image) => {
    console.log('IMAGE IN MAP: ', image);
    return image.imageUrl;
  });
  console.log('ONE DOG IMG: ', dogImg);

  return (
    <StyledCarousel>
      {/* <div className="controls-wrapper">
        <button onClick={removeItem}>Remove Item</button>
        <button onClick={addItem}>Add Item</button>
      </div> */}
      <hr className="seperator" />
      <div className="carousel-wrapper">
        <Carousel breakPoints={breakPoints}>
          {dogs.map((dog) => (
            <div>
              <Item>{dog.name}</Item>
            </div>
          ))}
          <h1>pic</h1>
        </Carousel>
      </div>
    </StyledCarousel>
  );
};

export default PicCarousel;
