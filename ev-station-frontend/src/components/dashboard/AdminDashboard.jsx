import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {
  const [pendingHosts, setPendingHosts] = useState([]);
  const [error, setError] = useState("");

  const fetchPendingHosts = async () => {
    try {
      const res = await api.get("/admin/pending-hosts");
      setPendingHosts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load pending hosts.");
    }
  };

  useEffect(() => {
    fetchPendingHosts();
  }, []);

  const approveHost = async (id) => {
    try {
      await api.put(`/admin/approve-host/${id}`);
      fetchPendingHosts(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const rejectHost = async (id) => {
    try {
      await api.delete(`/admin/reject-host/${id}`);
      fetchPendingHosts(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Pending Hosts</h2>
      {pendingHosts.length === 0 ? (
        <p>No pending hosts.</p>
      ) : (
        pendingHosts.map((host) => (
          <div key={host.userId}>
            <p>{host.firstName} {host.lastName}</p>
            <p>{host.email}</p>
            <p>{host.phone}</p>
            <button onClick={() => approveHost(host.userId)}>Approve</button>
            <button onClick={() => rejectHost(host.userId)}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
