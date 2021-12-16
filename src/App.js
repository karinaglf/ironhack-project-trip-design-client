import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import CreateTripPage from './pages/Trips/CreateTripPage/CreateTripPage';
import TripDetailsPage from './pages/Trips/TripDetailsPage/TripDetailsPage'
import EditTripPage from './pages/Trips/EditTripPage/EditTripPage';
import Experiences from './pages/ItemsPage/ExperiencesPage';

import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from './components/IsAnon/IsAnon';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {

  return (
    <>
      <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trips/:tripId" element={<IsPrivate> <TripDetailsPage /> </IsPrivate>} />
            <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>}/>
            <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>}/>
            <Route path="/profile" element={<IsPrivate> <ProfilePage /> </IsPrivate>}/>
            <Route path="/experiences" element={<IsPrivate> <Experiences /> </IsPrivate>}/>
            <Route path="/add-trip" element={<IsPrivate> <CreateTripPage /> </IsPrivate>}/>
            <Route path="/trips/edit/:tripId/" element={<IsPrivate> <EditTripPage /> </IsPrivate>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        <Footer />
    </>   
  );
}

export default App;
