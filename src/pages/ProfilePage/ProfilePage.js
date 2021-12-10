import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import TripsCard from '../../components/TripsCard/TripsCard';

const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5005';

function ProfilePage() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Hello </h2>

      <Link to={`/create-trip`}>
        <button>Create Trip</button>
      </Link>

      <div className="profile-img-wrapper">
        {user && (
          <>
            <img className="profile-img" src={user.image} alt="profile" />
            <p>{user.email}</p>
            <p>{user.name}</p>
            {user.createdTrips.map((oneTrip) => {
              return (
                <Link key={oneTrip._id} to={`/trips/${oneTrip._id}`}>
                  <div className="trip-list-card">
                    <div className="trip-card-image-col">
                      <img src={oneTrip.coverImg} alt="coverImg" width="200"/>
                    </div>
                    <div className="trip-card-info-col">
                      <h3>{oneTrip.tripName}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
