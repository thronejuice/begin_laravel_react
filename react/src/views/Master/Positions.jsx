import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function Positions() {
    const [positions, setPosition] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()
  
    useEffect(() => {
      getPosition();
    }, [])
  
    const onDeleteClick = positions => {
      if (!window.confirm("Are you sure you want to delete this position?")) {
        return
      }
      axiosClient.delete(`/positions/${positions.id}`)
        .then(() => {
          setNotification('Position was successfully deleted')
          getPosition()
        })
    }
  
    const getPosition = () => {
      setLoading(true)
      axiosClient.get('/positions')
        .then(({ data }) => {
          setLoading(false)
          setPosition(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  
    return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1>Positions</h1>
          <Link className="btn-add" to="/positions/new">Add new</Link>
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
              {positions.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>
                    <Link className="btn-edit" to={'/positions/' + p.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(p)}>Delete</button>
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