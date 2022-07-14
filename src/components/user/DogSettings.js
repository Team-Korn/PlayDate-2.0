import React from 'react';
import './Settings.css'

const DogSettings = () => {
  return (
    <div className="container">
      <form action="action_page.php">
        <div className="row">
          <div className="col-25">
            <label htmlFor="name">Name</label>
          </div>
          <div className="col-75">
            <input type="text" id="name" name="name" placeholder="Your name..."/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="breed">Breed</label>
          </div>
          <div className="col-75">
            <input type="text" id="breed" name="breed" placeholder="What type of furry friend do you have.."/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="size">Size</label>
          </div>
          <div className="col-75">
            <select id="size" name="size">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="about-me">About me</label>
          </div>
          <div className="col-75">
            <textarea id="subject" name="subject" placeholder="Write something.." ></textarea>
          </div>
        </div>
        <div className="row">
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
  )
}

export default DogSettings
