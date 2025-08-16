import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token
    localStorage.removeItem("token");

    // Redirect to login
    navigate("/");
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;