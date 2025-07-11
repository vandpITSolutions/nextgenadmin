import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    const snap = await getDocs(collection(db, "bookings"));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBookings(data.filter(b => b.status !== "completed"));
  };

  const handleComplete = async (id) => {
    const ref = doc(db, "bookings", id);
    await updateDoc(ref, { status: "completed" });
    fetchBookings();
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      {bookings.length === 0 ? (
        <p>No ongoing bookings</p>
      ) : (
        <ul>
          {bookings.map(b => (
            <li key={b.id}>
              <strong>{b.name}</strong> | {b.date} {b.time} - {b.guests} guests
              <button onClick={() => handleComplete(b.id)}>Mark Completed</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
