import { Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { searchContact, searchReset } from "../actions/PhoneBook_action";

export default function UserSearch(props) {

  const dispatch = useDispatch()
  const [query, setQuery] = useState({
    name: "",
    phone: "",
  });

  const [search, setSearch] = useState({
    isSearch: false,
  });

  const [mode, setMode] = useState({
    mode: "and",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuery({
      ...query,
      [name]: value,
    });
  };

  const handleOnReset = () => {
    setQuery({
      name: "",
      phone: "",
    });
    setMode({
      mode: "and",
    });
    setSearch({
      isSearch: false,
    });
    dispatch(searchReset())
  };

  const handleModeChanges = (event) => {
    setMode({
      ...mode,
      mode: event.target.value,
    });
  };

  const handleOnSearchSubmit = useCallback((event) => {
    event.preventDefault();
    if (query.name === "" && query.phone === "") {
      return event.preventDefault();
    }
    dispatch(searchContact({
      name: query.name,
      phone: query.phone,
      mode: mode.mode,
    }))
    setSearch({
      isSearch: true,
    });
  },[dispatch, query, mode ])

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
                <input type="text" className="form-control" id="name-search" name="name" onChange={handleInputChange} value={query.name} />
              </div>
            </div>
            <div className="col-sm-6">
              <label htmlFor="phone-search" className="col-sm-4 col-form-label">
                Phone
              </label>
              <div className="col-sm-12">
                <input type="tel" className="form-control" id="phone-search" name="phone" onChange={handleInputChange} value={query.phone} />
              </div>
            </div>
          </div>
          <div className="row my-1">
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-6">
                  <button type="submit" form="search-contact-form" className="btn btn-secondary col-sm-12">
                    Search
                  </button>
                </div>
                {search.isSearch && (
                  <div className="col-sm-6">
                    <button type="button" className="btn btn-warning col-sm-12" onClick={handleOnReset}>
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
                    <input className="form-check-input" type="radio" name="mode" id="strict" value="and" checked={mode.mode === "and"} onChange={handleModeChanges} />
                    <label className="form-check-label" htmlFor="strict">
                      Specific
                    </label>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="mode" id="loose" value="or" checked={mode.mode === "or"} onChange={handleModeChanges} />
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