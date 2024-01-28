import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function PositionsForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [positions, setPositions] = useState({
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
        .get(`/positions/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setPositions(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (positions.id) {
      axiosClient
        .put(`/positions/${positions.id}`, positions)
        .then(() => {
          setNotification("Positions was successfully updated");
          navigate("/positions");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/positions", positions)
        .then(() => {
          setNotification("Postions was successfully created");
          navigate("/positions");
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
      {positions.id && <h1>Update Position: {positions.name}</h1>}
      {!positions.id && <h1>New Position</h1>}
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
              value={positions.name}
              onChange={(ev) =>
                setPositions({ ...positions, name: ev.target.value })
              }
              placeholder="Name"
            />

            <label>
              Active:
              <input
                type="radio"
                value="1"
                checked={positions.is_active === 1}
                onChange={(ev) =>
                  setPositions({
                    ...positions,
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
                checked={positions.is_active === 0}
                onChange={(ev) =>
                  setPositions({
                    ...positions,
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
