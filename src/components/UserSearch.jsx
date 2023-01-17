import { Fragment, useState, useContext } from "react";
import { ParamsContext } from "./UserBox";

export default function UserSearch() {
  const { params, setParams } = useContext(ParamsContext);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });

  const [search, setSearch] = useState(false);
  const [mode, setMode] = useState("and");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleOnReset = () => {
    setContact({
      name: "",
      phone: "",
    });
    setSearch(false);
    setMode("and");
    setParams({
      page: 1,
      pages: 1,
      name: "",
      phone: "",
      mode: "and"
    })
  };

  const handleModeChanges = (value) => {
    setMode(value);
  };

  const handleOnSearchSubmit = (event) => {
    event.preventDefault();
    if (contact.name === "" && contact.phone === "") {
      return event.preventDefault();
    }
    setParams({
      ...params,
      page: 1,
      mode,
      name: contact.name,
      phone: contact.phone,
    })
    setSearch(true);
  };

  return (
    <Fragment>
      <div className="row">
        <h2>Search contact</h2>
      </div>
      <form id="search-contact-form" onSubmit={handleOnSearchSubmit}>
        <div className="row my-1">
          <div className="row my-1">
            <div className="col-sm-6">
              <label htmlFor="name-search" className="col-sm-4 col-form-label">
                Name
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="name-search"
                  name="name"
                  onChange={handleInputChange}
                  value={contact.name}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <label htmlFor="phone-search" className="col-sm-4 col-form-label">
                Phone
              </label>
              <div className="col-sm-12">
                <input
                  type="tel"
                  className="form-control"
                  id="phone-search"
                  name="phone"
                  onChange={handleInputChange}
                  value={contact.phone}
                />
              </div>
            </div>
          </div>
          <div className="row my-1">
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-6">
                  <button
                    type="submit"
                    form="search-contact-form"
                    className="btn btn-secondary col-sm-12"
                  >
                    Search
                  </button>
                </div>
                {search && (
                  <div className="col-sm-6">
                    <button
                      type="button"
                      className="btn btn-warning col-sm-12"
                      onClick={handleOnReset}
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="col-sm-12">search-mode:</div>
              <fieldset className="row">
                <div className="col-sm-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mode"
                      id="strict"
                      value="and"
                      checked={mode === "and"}
                      onChange={(e) => handleModeChanges(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="strict">
                      Specific
                    </label>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="mode"
                      id="loose"
                      value="or"
                      checked={mode === "or"}
                      onChange={(e) => handleModeChanges(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="loose">
                      Any
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
