import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar/Navbar';
import Navbar1 from './components/Navbar/Navbar1';

import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import CreateTripPage from './pages/Trips/CreateTripPage/CreateTripPage';
import TripDetailsPage from './pages/Trips/TripDetailsPage/TripDetailsPage'
import EditTripPage from './pages/Trips/EditTripPage/EditTripPage';
import AllCitiesPage from './pages/Cities/AllCitiesPage/AllCitiesPage';

import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>}/>
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>}/>
        <Route path="/profile" element={<IsPrivate> <ProfilePage /> </IsPrivate>}/>
        <Route path="/add-trip" element={<IsPrivate> <CreateTripPage /> </IsPrivate>}/>
        <Route path="/trips/edit/:tripId/" element={<IsPrivate> <EditTripPage /> </IsPrivate>} />
        <Route path="/trips/:tripId" element={<IsPrivate> <TripDetailsPage /> </IsPrivate>} />
        <Route path="/cities" element={ <IsPrivate> <AllCitiesPage /> </IsPrivate>}/>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
