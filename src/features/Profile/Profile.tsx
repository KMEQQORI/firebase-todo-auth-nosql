import { useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../authentication/authenticationSlice";
import { SlLogout } from "react-icons/sl";
import "./Profile.css";
import "./ProfileMobile.css";

function Profile() {
  const dispatch = useAppDispatch();

  return (
    <div className="profile">
      <div className="logout-button" onClick={() => dispatch(logoutUser())}>
        <SlLogout /> log out
      </div>
    </div>
  );
}
export default Profile;
