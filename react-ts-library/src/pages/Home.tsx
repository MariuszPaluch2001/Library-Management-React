import { NormalUserHomePage } from "../components/NormalUserHomePage";
import { NotLoggedIn } from "../components/NotLoggedIn";
import { SuperUserHomePage } from "../components/SuperUserHomePage";
import { useAuth } from '../data/useAuth';

export const Home = () => {
    const {user} = useAuth();
    if (user && user.isSuperUser){
      return(
        <div className="container">
          <SuperUserHomePage></SuperUserHomePage>
        </div>
      );
    } else if(user){
      return(
        <div className="container">
            <NormalUserHomePage></NormalUserHomePage>
        </div>
      );
    } else {
      return (
        <div className="container">
          <NotLoggedIn></NotLoggedIn>
        </div>
      );
    }
}

