import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import EditProfileModal from "../EditProfileForm";
import SideBar from "../SideBar";
import { viewProfile } from "../../store/profile";

import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const { userId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  let user = useSelector((state) => state.profile);

  useEffect(async () => {
    await dispatch(viewProfile(userId));
    setLoaded(true);
  }, [dispatch]);

  let projects;
  const projectsObj = useSelector((state) => state.profile.projects);
  if (projectsObj) {
    projects = Object.values(projectsObj);
    projects = projects.filter((project) => project?.is_private == false);
    projects.sort((a, b) => {
      const keyA = new Date(a?.start_date);
      const keyB = new Date(b?.start_date);
      return keyA > keyB ? -1 : 1;
    });
  }

  let tasks;
  const tasksObj = useSelector((state) => state.profile.tasks);
  if (tasksObj) {
    tasks = Object.values(tasksObj);
    tasks = tasks.filter((task) => task.assignee_id == user.id);
    tasks.sort((a, b) => {
      const keyA = new Date(a?.create_date);
      const keyB = new Date(b?.create_date);
      return keyA > keyB ? -1 : 1;
    });
  }

  if (!loaded) {
    return null;
  }
  return (
    <div>
      <SideBar />
      <div className="page-container">
        <div>
          <h1 className="home-header">{user?.first_name}'s Profile</h1>
          <div className="profile-card">
            <div className="purple-box">
              <div className="project-task-letters">
                {user.first_name.charAt(0).toUpperCase()}
                {user.last_name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="info-card">
              <div className="username">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="occupation">{user?.occupation}</div>
              <div className="email">{user?.email}</div>
              <div className="bio">{user?.bio}</div>
              {user.id == sessionUser.id ? <EditProfileModal /> : null}
            </div>
          </div>

          <div className="profile-project-card">
            <h2>Projects</h2>
            <div className="profile-project-card-inner">
              <div className="recent-header">Recent public projects</div>
              <div className="profile-project">
                {projects.length > 0 ? (
                  projects.slice(0, 8).map((project) => (
                    <Link to={`/projects/${project.id}`} key={project.id}>
                      <div className="project">
                        <div className="project-icon">
                          <div className="rectangle-icon">
                            <i className="fa-solid fa-list-ul"></i>
                          </div>
                        </div>
                        <div className="project-details">
                          <div className="project-name">{project.name}</div>
                          <div className="project-date">{project.end_date}</div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>No public projects</div>
                )}
              </div>
            </div>
          </div>
          <div className="profile-project-card">
            <h2>Tasks</h2>
            <div className="profile-project-card-inner">
              <div className="recent-header">Recent tasks</div>
              <div className="profile-project">
                {tasks.length > 0 ? (
                  tasks.slice(0, 8).map((task) => (
                    <div className="profile-task" key={task.id}>
                      <div className="task-icon">
                        <div className="circle-icon">
                          <i className="fa-regular fa-circle-check fa-lg"></i>
                        </div>
                      </div>
                      <div className="task-details">
                        <div className="home-task-name">{task.name}</div>
                        <div className="task-date">{task.end_date}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div> No tasks yet </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
