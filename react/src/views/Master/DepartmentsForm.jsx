import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function DepartmentsForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [departments, setDepartments] = useState({
    id: null,
    name: "",
    is_active: "true",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/departments/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setDepartments(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (departments.id) {
      axiosClient
        .put(`/departments/${departments.id}`, departments)
        .then(() => {
          setNotification("Department was successfully updated");
          navigate("/departments");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/departments", departments)
        .then(() => {
          setNotification("Departments was successfully created");
          navigate("/departments");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {departments.id && <h1>Update Departments: {departments.name}</h1>}
      {!departments.id && <h1>New Departments</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={departments.name}
              onChange={(ev) =>
                setDepartments({ ...departments, name: ev.target.value })
              }
              placeholder="Name"
            />

            <label>
              Active:
              <input
                type="radio"
                value="1"
                checked={departments.is_active === 1}
                onChange={(ev) =>
                  setDepartments({
                    ...departments,
                    is_active: ev.target.value === "1" ? 1 : 0,
                  })
                }
              />
            </label>

            <label>
              Inactive:
              <input
                type="radio"
                value="0"
                checked={departments.is_active === 0}
                onChange={(ev) =>
                  setDepartments({
                    ...departments,
                    is_active: ev.target.value === "0" ? 0 : 1,
                  })
                }
              />
            </label>

            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
