import Profile from "../Profile/Profile";
import TodoPanel from "../TodoList/TodoPanel";
import "./home.css";

function Home() {
  return (
    <div className="home-layout">
      <TodoPanel />
      <Profile />
    </div>
  );
}
export default Home;
