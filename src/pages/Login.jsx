import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
const Login = () => {
  const [show, setShow] = useState(false);
  const { logIn, setUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // get form data
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        Swal.fire({
          icon: "success",
          title: "User Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((errors) => {
        setError({ ...error, login: errors.code });
        toast.error(errors?.message);
      });
  };
  // Google Signin
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()

      toast.success('Signin Successful')
      navigate(navigate(location?.state ? location.state : "/"), { replace: true })
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-xl p-6 border">
          <h1 className="text-4xl font-bold">Login</h1>

          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                name="password"
                type={show ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                required
              />
              <span
                onClick={() => setShow(!show)}
                className="btn btn-sm absolute right-2 top-11"
              >
                {show ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {error?.login && (
              <label className="label py-2 px-3 bg-red-400 text-black text-sm">
                {error.login}
              </label>
            )}
            <label className="label">
              <Link
                to="/auth/forgot"
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </Link>
            </label>
            <div className="form-control mt-3">
              <button className="relative group px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg overflow-hidden shadow-md hover:bg-blue-600 transition duration-300">
                <span className="absolute inset-0 w-0 h-full bg-purple-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10">Login</span>
              </button>
            </div>
          </form>
          <p className="font-semibold text-center">
            Not registered yet ?{" "}
            <Link className="text-red-500" to="/register">
              Create an account
            </Link>
          </p>
          <p className="py-2 text-center text-xl font-semibold">or</p>
          <div className="*:w-full py-4">
            <button onClick={handleGoogleLogin} className="btn">
              <FcGoogle />
              Login With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
