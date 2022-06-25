import { FC } from "react";
import SeachBar from "views/Components/search-bar";
import MovieGridList from "views/Components/movie-grid-list";
import Header from "views/page-header";

interface LandingPageProps {
    
}
 
const LandingPage: FC<LandingPageProps> = () => {
    return ( 
        <div className="landing__page">
            <Header/>
            <SeachBar/>
            <MovieGridList/>
        </div>
     );
}
 
export default LandingPage;