import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EditPost from "./components/EditPost";

const App = () => (
    <Router>
        <Header /> {/* Added Header */}
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/edit/:id" element={<EditPost />} />
            </Routes>
        </main>
        <Footer /> {/* Added Footer */}
    </Router>
);

export default App;

