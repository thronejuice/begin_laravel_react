import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
  
    useEffect(() => {
      getJobs();
    }, [])
  
    const onDeleteClick = jobs => {
      if (!window.confirm("Are you sure you want to delete this jobs?")) {
        return
      }
      axiosClient.delete(`/jobs/${jobs.id}`)
        .then(() => {
          setNotification('Jobs was successfully deleted')
          getJobs()
        })
    }
  
    const getJobs = () => {
      setLoading(true)
      axiosClient.get('/jobs')
        .then(({ data }) => {
          setLoading(false)
          setJobs(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  
    return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Jobs</h1>
          <Link className="btn-add" to="/jobs/new">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Start_date</th>
              <th>End_date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="3" class="text-center">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {jobs.map((j, index) => (
                <tr key={j.id}>
                  <td>{index + 1}</td>
                  <td>{j.title}</td>
                  <td>{j.start_date}</td>
                  <td>{j.end_date}</td>
                  <td>{j.status_name}</td>
                  <td>
                    <Link className="btn-edit" to={'/jobs/' + j.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(j)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
  }