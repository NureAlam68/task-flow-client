import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
