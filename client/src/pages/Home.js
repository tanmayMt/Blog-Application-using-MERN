// import PostList from "../components/PostList";

// const Home = () => (
//     <div>
//         <h1>Welcome to the Blog</h1>
//         <PostList />
//     </div>
// );

// export default Home;



import PostList from "../components/PostList";
import "./Home.css"; // Import CSS file

const Home = () => (
    <div className="home-container">
        <div className="home-content">
            <PostList />
        </div>
    </div>
);

export default Home;

