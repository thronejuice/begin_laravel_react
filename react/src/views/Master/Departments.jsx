import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
  
    useEffect(() => {
      getDepartments();
    }, [])
  
    const onDeleteClick = departments => {
      if (!window.confirm("Are you sure you want to delete this departments?")) {
        return
      }
      axiosClient.delete(`/departments/${departments.id}`)
        .then(() => {
          setNotification('Departments was successfully deleted')
          getDepartments()
        })
    }
  
    const getDepartments = () => {
      setLoading(true)
      axiosClient.get('/departments')
        .then(({ data }) => {
          setLoading(false)
          setDepartments(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  
    return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Departments</h1>
          <Link className="btn-add" to="/departments/new">Add new</Link>
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
              {departments.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>
                    <Link className="btn-edit" to={'/departments/' + d.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(d)}>Delete</button>
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