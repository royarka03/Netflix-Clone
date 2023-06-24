import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import TV from './components/TV/TV';
import Profile from './components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Search from './components/Search/Search';
import Season from './components/TV/Season';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const cookies = document.cookie;
      let token = cookies.split('; ').find((cookie) => {
        return cookie.startsWith('usercookie=')
      }).split('=')[1];
      console.log(token);
      const res = await fetch("http://localhost:4000/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        withCredentials: true
      });
      res.json().then(data => {
        console.log(data);
        if(data.status === 401) {
          setUser(null);
        } else {
          setUser(data.user);
        }
      })
    }
    fetchUser();
  }, []);   


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={user ? <Home type="movie"/> : <Register />}></Route>
        <Route path='/movie' element={user ? <Home type="movie" /> : <Register />}></Route>
        <Route path='/tv' element={user ? <Home type="tv" /> : <Register />}></Route>
        <Route path='/register' element={user ? <Home type="movie"/> : <Register />}></Route>
        <Route path='/login' element={user ? <Home type="movie"/> : <Login />}></Route>
        <Route path='/movie/:id' element={user ? <Movie /> : <Register />}></Route>
        <Route path='/movie/:id/watch' element={user ? <VideoPlayer /> : <Register />}></Route>
        <Route path='/tv/:id' element={user ? <TV /> : <Register />}></Route>
        <Route path='/tv/:id/season/:sid' element={user ? <Season /> : <Register />} />
        <Route path='/tv/:id/season/:sid/episode/:eid/watch' element={user ? <VideoPlayer /> : <Register />} />
        <Route path='/profile' element={user ? <Profile user={user}/> : <Register />} />
        <Route path='/search' element={user ? <Search /> : <Register />} />
      </Routes> 
    </div>
  );
}

export default App;
