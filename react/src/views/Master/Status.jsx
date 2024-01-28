import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Status() {
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
  
    useEffect(() => {
      getStatus();
    }, [])
  
    const onDeleteClick = status => {
      if (!window.confirm("Are you sure you want to delete this statu?")) {
        return
      }
      axiosClient.delete(`/status/${status.id}`)
        .then(() => {
          setNotification('Status was successfully deleted')
          getStatus()
        })
    }
  
    const getStatus = () => {
      setLoading(true)
      axiosClient.get('/status')
        .then(({ data }) => {
          setLoading(false)
          setStatus(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  
    return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Status</h1>
          <Link className="btn-add" to="/status/new">Add new</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
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
              {status.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>
                    <Link className="btn-edit" to={'/status/' + s.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(s)}>Delete</button>
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