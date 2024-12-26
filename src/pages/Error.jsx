import { Link } from "react-router-dom";
import errorImg from "../assets/electrocuted-caveman-animation-404-error-page.gif";
import { Helmet } from "react-helmet-async";

const Error = () => {
  return (
    <div>
      <Helmet>
        <title>Food | Error</title>
      </Helmet>
      <div className="card bg-base-100 min-h-screen shadow-xl">
        <figure className="px-10 py-1 flex justify-center">
          <img
            src={errorImg}
            alt="Error Image"
            className="rounded-xl h-96 w-auto"
          />
        </figure>
        <div className="card-body pt-1 items-center text-center">
          <h1 className="text-4xl font-extrabold text-center">404</h1>
          <h2 className="card-title">Oops!</h2>
          <p>The Page Your Are Enter Is Not Found...!</p>
          <div className="card-actions">
            <Link to={"/"}>
              <button className="bg-blue-500 text-white font-medium py-3 px-8 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-blue-500/50">
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
