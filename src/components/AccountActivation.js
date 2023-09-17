import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AccountActivation({ url }) {
  const { id } = useParams();
  const Navigate = useNavigate();

  const [activated, setActivated] = useState(false);
  const [done, setDone] = useState(false);

  const HandleActivate = async (id) => {
    try {
    await axios.patch(`${url}/accountactivation/${id}`);
      setActivated(true);
      setTimeout(() => {
        Navigate("/signin");
      }, 1000);
    } catch (err) {
      console.error(err);
      setDone(true);
      setTimeout(() => {
        Navigate("/");
      }, 2000);
    }
  };

  return (
    <section className="container vh-100" >
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div
              className="row text-center fw-bold">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-sm-12">
                  <Link>
                    <button
                      className="btn btn-primary fw-bold p-2"
                      onClick={() => HandleActivate(id)}
                    >
                      Click Me to Activate
                    </button>
                  </Link>
                </div>
              </div>

              <p>
                <span>
                  {activated ? "Account Activated Successfully" : null}
                  <span>{done ? "Activated Account" : null}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountActivation;