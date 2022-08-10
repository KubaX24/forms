/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Routes, Route } from "solid-app-router"

import './assets/css/index.css'
import './assets/css/page.css'
import './assets/css/result.css'
import Header from "./content/Header"

import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import VotePage from "./pages/VotePage"
import VotedPage from "./pages/VotedPage"
import Footer from "./content/Footer";


function App() {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                    <Route path="/vote/:id" element={<VotePage />} />
                    <Route path="/vote/:id/voted" element={<VotedPage />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    )
}

render(() => <App />, document.getElementById('root') as HTMLElement);
