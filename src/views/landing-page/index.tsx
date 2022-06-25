import { FC } from "react";
import SeachBar from "views/Components/search-bar";
import MovieGridList from "views/Components/movie-grid-list";
import Header from "views/page-header";
import Navbar from "views/Components/navbar";
import Dropdown from "views/Components/filter";
 
const LandingPage: FC = () => {
    return ( 
        <div className="landing__page">
            <Navbar />
            <Header />
            <SeachBar />
            <Dropdown />
            <MovieGridList />
        </div>
     );
}
 
export default LandingPage;