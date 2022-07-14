import React from 'react';
import './Settings.css'

const UserSettings = () => {
  return (
    <div className="container">
    <form action="action_page.php">
      <div className="row">
        <div className="col-25">
          <label htmlFor="name">Name</label>
        </div>
        <div className="col-75">
          <input type="text" id="name" name="name" placeholder="Your name.."/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="email">Email</label>
        </div>
        <div className="col-75">
          <input type="text" id="lname" name="lastname" placeholder="Your email.."/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="email">Email</label>
        </div>
        <div className="col-75">
          <input type="text" id="lname" name="lastname" placeholder="Your email.."/>
        </div>
      </div>
      <div className="row">
        <div className="col-25">
          <label htmlFor="subject">Subject</label>
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

export default UserSettings
