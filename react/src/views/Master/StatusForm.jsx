import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function StatusForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [status, setStatus] = useState({
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
        .get(`/status/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setStatus(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (status.id) {
      axiosClient
        .put(`/status/${status.id}`, status)
        .then(() => {
          setNotification("Status was successfully updated");
          navigate("/status");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/status", status)
        .then(() => {
          setNotification("Status was successfully created");
          navigate("/status");
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
      {status.id && <h1>Update Status: {status.name}</h1>}
      {!status.id && <h1>New Status</h1>}
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
              value={status.name}
              onChange={(ev) =>
                setStatus({ ...status, name: ev.target.value })
              }
              placeholder="Name"
            />

            <label>
              Active:
              <input
                type="radio"
                value="1"
                checked={status.is_active === 1}
                onChange={(ev) =>
                  setStatus({
                    ...status,
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
                checked={status.is_active === 0}
                onChange={(ev) =>
                  setStatus({
                    ...status,
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
