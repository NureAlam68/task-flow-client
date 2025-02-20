import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc"; 

const Login = () => {
  const { googleLogin: signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
//     googleLogin()
//       .then((result) => {
//         const user = result.user;
//         console.log(user);
//         const userInfo = {
//           userId: user?.uid,
//           name: user?.displayName,
//           email: user?.email,
//         };
//         axios.post("http://localhost:5000/users", userInfo).then((res) => {
//           console.log("Response Data:", res.data);
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "User login successfully.",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//           navigate("/");
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithGoogle();
      const user = res.user;
        console.log(user);
        const userInfo = {
          userId: user?.uid,
          name: user?.displayName,
          email: user?.email,
        };
      const response = await axios.post("http://localhost:5000/users", userInfo);
      
      if (response.data.insertedId || response.data.insertedId === null) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User login successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, {replace: true});
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-indigo-950">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full text-center backdrop-blur-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Welcome Back!
                </h2>
                <p className="text-gray-600 mb-6">
                    Sign in with your Google account to continue.
                </p>
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full py-3 px-6 text-lg font-medium border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300"
                >
                    <FcGoogle size={28} className="mr-3" /> Login With Google
                </button>
            </div>
        </div>
  );
};

export default Login;
