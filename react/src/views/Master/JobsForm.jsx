import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function JobsForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [jobs, setJobs] = useState({
    id: null,
    name: "",
    title: "",
    status_id: "", // Add status to the initial state
    description: "",
    start_date: new Date(),
    end_date: new Date(),
    user_id: "", // Add status to the initial state
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusOptions, setStatusOptions] = useState([]); // Initialize statusOptions state
  const { setNotification } = useStateContext();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [usersOptions, setUserOptions] = useState([]); // Initialize statusOptions state

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/jobs/${id}`)
        .then(({ data }) => {
          setLoading(false);

          const startDate = new Date(data.start_date);
          const endDate = new Date(data.end_date);

          setJobs({
            ...data,
            start_date: isNaN(startDate) ? new Date() : startDate,
            end_date: isNaN(endDate) ? new Date() : endDate,
          });
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }
  // status
  useEffect(() => {
    // Fetch status options from API
    axiosClient
      .get("/status")
      .then(({ data }) => {
        setStatusOptions(data.data); // Assuming API response is an array of options
      })
      .catch((error) => {
        console.error("Error fetching status options:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // users
  useEffect(() => {
    // Fetch status options from API
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setUserOptions(data.data); // Assuming API response is an array of options
      })
      .catch((error) => {
        console.error("Error fetching status options:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const onSubmit = (ev) => {
    ev.preventDefault();

    const formattedJobs = {
      ...jobs,
      start_date: moment(jobs.start_date).format("YYYY-MM-DD"),
      end_date: moment(jobs.end_date).format("YYYY-MM-DD"),
    };

    if (formattedJobs.id) {
      axiosClient
        .put(`/jobs/${formattedJobs.id}`, formattedJobs)
        .then(() => {
          setNotification("Jobs was successfully updated");
          navigate("/jobs");
        })
        .catch((err) => {
          handleApiError(err);
        });
    } else {
      axiosClient
        .post("/jobs", formattedJobs)
        .then(() => {
          setNotification("Jobs was successfully created");
          navigate("/jobs");
        })
        .catch((err) => {
          handleApiError(err);
        });
    }
  };

  return (
    <>
      {jobs.id && <h1>Update Jobs: {jobs.name}</h1>}
      {!jobs.id && <h1>New Jobs</h1>}
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
            <div>
              <label>title:</label>
              <input
                value={jobs.title}
                onChange={(ev) => setJobs({ ...jobs, title: ev.target.value })}
                placeholder="Title"
              />
            </div>
            <div>
              <label>Descripton:</label>
              <input
                value={jobs.description}
                onChange={(ev) =>
                  setJobs({ ...jobs, description: ev.target.value })
                }
                placeholder="description"
              />
            </div>
            <div>
              <label>Status:</label>
              <select
                value={jobs.status_id}
                onChange={(ev) =>
                  setJobs({ ...jobs, status_id: ev.target.value })
                }
              >
                <option value={null}> Select status </option>
                {statusOptions.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Start Date:</label>
              <DatePicker
                selected={jobs.start_date}
                onChange={(date) => setJobs({ ...jobs, start_date: date })}
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div>
              <label>End Date:</label>
              <DatePicker
                selected={jobs.end_date}
                onChange={(date) => setJobs({ ...jobs, end_date: date })}
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div>
              <label>User:</label>
              <select
                value={jobs.user_id}
                onChange={(ev) =>
                  setJobs({ ...jobs, user_id: ev.target.value })
                }
              >
                <option value={null}> Select user </option>
                {usersOptions.map((users) => (
                  <option key={users.id} value={users.id}>
                    {users.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
