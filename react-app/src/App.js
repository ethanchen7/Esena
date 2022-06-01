import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import SingleProjectPreview from "./components/SingleProjectPreview";
import NavBar from "./components/Navigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MyTasks from "./components/MyTasks";
import MyProjects from "./components/MyProjects";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
import HomePage from "./components/HomePage";
import { authenticate } from "./store/session";
import { setProjects } from "./store/projects";
import { setTasks } from "./store/tasks";
import { setAllUsers, setTeammates } from "./store/teammates";
<<<<<<< HEAD
import { setComments } from "./store/comments"
import FrontPage from "./components/FrontPage";
=======
import { setComments } from "./store/comments";
>>>>>>> f27ff408de5f9f33dae8184a7f3bcb89c79f4534

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (session) {
        const res = await fetch(`/api/users/${session.id}`);
        if (res.ok) {
          const data = await res.json();

          dispatch(setProjects(data.projects));
          dispatch(setTasks(data.tasks));
          dispatch(setTeammates(data.teammates));
        }
      }
      setLoaded(true);
    })();
  }, [dispatch, session]);

  useEffect(() => {
    (async () => {
      if (session) {
        const res = await fetch(`/api/users`);
        if (res.ok) {
          const data = await res.json();
          dispatch(setAllUsers(data.users));
        }
      }
    })();
  }, [dispatch, session]);

  useEffect(() => {
    (async () => {
      if (session) {
        const res = await fetch("/api/comments");
        if (res.ok) {
          const data = await res.json();
          dispatch(setComments(data));
        }
      }
    })();
  }, [dispatch, session]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/" exact={true}>
          <FrontPage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path="/" exact={true}>
          <HomePage />
<<<<<<< HEAD
        </ProtectedRoute> */}
        <ProtectedRoute path="/my-tasks" exact={true}>
=======
        </ProtectedRoute>
        <Route path="/my-tasks" exact={true}>
>>>>>>> f27ff408de5f9f33dae8184a7f3bcb89c79f4534
          <MyTasks />
        </ProtectedRoute>
        <ProtectedRoute path="/my-projects" exact={true}>
          <MyProjects />
        </ProtectedRoute>
        <ProtectedRoute path="/projects/:projectId" exact={true}>
          <SingleProjectPreview />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/:userId" exact={true}>
          <Profile />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
