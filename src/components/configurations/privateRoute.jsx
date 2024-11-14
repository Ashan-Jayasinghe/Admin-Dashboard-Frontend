import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const isLoggedIn = localStorage.getItem("token"); // Check if the token exists (i.e., user is logged in)

  // If user is not logged in, redirect them to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the element (protected route)
  return <Route {...rest} element={element} />;
};

export default PrivateRoute;