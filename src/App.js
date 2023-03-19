import React from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage"
import AdminSecurity from "./admin/AdminSecurity"
import './App.css';
import AdminPage from './admin/AdminPage';
import ContactUsPage from './pages/ContactUsPage';
import SearchDestinationPage from './pages/SearchDestinationPage';
import DestinationsPage from './pages/DestinationsPage';
import SearchOfferPage from './pages/SearchOfferPage';
import OffersPage from './pages/OffersPage';
import PurchaseMailPage from './pages/PurchaseMailPage';
import PurchaseMailPageOffer from './pages/PurchaseMailPageOffer';

function App() {
  return (
    <div>
    <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/search-destination" element={<SearchDestinationPage />} />
        <Route exact path="/destinations/:id" element={<DestinationsPage />} />

        <Route exact path="/hot-offers" element={<SearchOfferPage />} />
        <Route exact path="/offers/:id" element={<OffersPage />} />

        <Route exact path="/contact-us" element={<ContactUsPage />} />

        <Route exact path="/purchase-mail/:id" element={<PurchaseMailPage />} />
        <Route exact path="/purchase-mail-offer/:id" element={<PurchaseMailPageOffer />} />

        <Route path="/admin-security" element={<AdminSecurity />} />
        <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
    </div>
);
}

export default App;
