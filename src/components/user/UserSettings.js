import React from 'react';
import './Settings.css'

const UserSettings = () => {
  return (
  <div id="Settings-view">
    <div class="card card-outline-secondary">
      <div class="card-body">
        <form class="form" role="form" autocomplete="off">
          <div class="form-group row">
            <label class="col-lg-3 col-form-label form-control-label">Name</label>
              <div class="col-lg-9">
                <input class="form-control" type="text" />
              </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-3 col-form-label form-control-label">Email</label>
              <div class="col-lg-9">
                <input class="form-control" type="email" />
              </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-3 col-form-label form-control-label">City</label>
              <div class="col-lg-9">
                <input class="form-control" type="text" />
              </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-3 col-form-label form-control-label">State</label>
              <div class="col-lg-9">
                <input class="form-control" type="text"/>
              </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-3 col-form-label form-control-label">Zipcode</label>
              <div class="col-lg-9">
                <input class="form-control" type="text" />
              </div>
          </div>
          <div class="form-group row">
            <label class="col-lg-3 col-form-label form-control-label"></label>
            <div class="col-lg-9">
              <input type="reset" class="btn btn-secondary" value="Cancel"/>
              <input type="button" class="btn btn-primary" value="Save Changes"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default UserSettings
