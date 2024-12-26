import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth, AuthContext } from "../provider/AuthProvider";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [show, setShow] = useState(false);
  const { createNewUser, setUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    // get form data
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    const passregex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passregex.test(password)) {
      toast.error(
        "Please add at lest one capital letter, one small letter and password must be 6 character"
      );
      return;
    }
    console.log({ name, email, photo, password });
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo })
          .then((r) => {
            console.log(r);
            navigate("/");
            setUser({ ...user, displayName: name, photoURL: photo });
          })
          .catch((err) => {
            toast.error(err.code);
          });
        toast.success("User register successful");
      })
      .catch((error) => {
        const errorCode = error.message;
        toast.error("User registration failed");
      });
  };
  // Google Signin
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();

      toast.success("Signin Successful");
      navigate(navigate("/"), { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Food | Register</title>
      </Helmet>
      <div className="flex justify-center items-center min-h-screen">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-xl p-6 border">
          <h1 className="text-4xl font-bold">Register your account</h1>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="photo url"
                className="input input-bordered"
                required
              />
            </div>
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
            <div className="form-control mt-6">
              <button className="relative group px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg overflow-hidden shadow-md hover:bg-blue-600 transition duration-300">
                <span className="absolute inset-0 w-0 h-full bg-purple-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10">Login</span>
              </button>
            </div>
          </form>
          <p className="font-semibold text-center">
            Already Have An Account ?
            <Link className="text-red-500" to="/login">
              Login
            </Link>
          </p>
          <p className="py-2 text-center text-xl font-semibold">or</p>
          <div className="*:w-full py-4">
            <button onClick={handleGoogleLogin} className="btn">
              <FcGoogle /> Register with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
