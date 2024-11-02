import React from "react";
import logo from "../images/solergi_logo.png";

function Menu() {
  return (
    <>
      <>
        <>
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <>
                    <div className="card-modal">
                      <ul className="list">
                        <li className="element">
                          <img
                            style={{ height: "25px" }}
                            src={logo}
                            alt="logo"
                          />
                          <p style={{ marginBottom: "-1px" }} className="label">
                            About
                          </p>
                        </li>
                        <li className="element">
                          <i class="fa-solid fa-people-group"></i>
                          <p
                            style={{ marginBottom: "-1px", marginLeft: "6px" }}
                            className="label"
                          >
                            Team
                          </p>
                        </li>
                      </ul>
                      <div className="separator" />

                      <ul className="list">
                        <li className="element">
                          <i class="fa-solid fa-address-book"></i>
                          <p
                            style={{ marginBottom: "-1px", marginLeft: "6px" }}
                            className="label"
                          >
                            Contact
                          </p>
                        </li>
                      </ul>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    </>
  );
}

export default Menu;
