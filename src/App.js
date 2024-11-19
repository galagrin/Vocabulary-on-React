import './App.css';
import Footer from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Table } from './Components/Table/Table';
import { CardCarousel } from './Components/CardCarousel/CardCarousel';
import { RandomCard } from './Components/RandomCard/RandomCard';
import { NotFound } from './Components/NotFound/NotFound';
// import { ContextProvider } from './store/Context';
import { ToastContainer } from 'react-toastify';
import wordsStore from './store/WordsStore';
import { Provider } from 'mobx-react';

function App() {
    return (
        <Provider {...wordsStore}>
            <Router>
                <div className="App">
                    <Header />
                    <main className="main">
                        <Routes>
                            <Route path="/" element={<Table />} />
                            <Route path="/game" element={<CardCarousel />} />
                            <Route path="/random" element={<RandomCard />} />
                            <Route path="*" element={<NotFound />}></Route>
                        </Routes>
                    </main>
                    <ToastContainer />
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
