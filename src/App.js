import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar/Navbar';

import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import CreateTripPage from './pages/CreateTripPage/CreateTripPage';
import TripDetailsPage from './pages/TripDetailsPage/TripDetailsPage';

import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';

function App() {
  useEffect(() => {
    document.title = 'Trip Design';
  }, []);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/profile" element={ <IsPrivate> <ProfilePage /> </IsPrivate>}/>
        <Route path="/create-trip" element={<IsPrivate> <CreateTripPage /> </IsPrivate>}/>
        <Route path="/trips/:tripId" element={<IsPrivate> <TripDetailsPage /> </IsPrivate>} />

        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>}/>
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>}/>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
