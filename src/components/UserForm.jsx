import { Fragment, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT, LOAD_CONTACT } from "../gql/query";

export default function UserList(props) {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });

  const [addContact, { loading, error }] = useMutation(ADD_CONTACT, {
    refetchQueries: [{ query: LOAD_CONTACT }],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    addContact({
      variables: {
        name: contact.name,
        phone: contact.phone,
      },
    });
    setContact({
      name: "",
      phone: "",
    });
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error.name}: {error.message}
      </div>
    );

  return (
    <Fragment>
      <div className="row">
        <h2>Add new contact</h2>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="row mt-1 mb-4">
          <div className="row my-1">
            <div className="col-sm-6">
              <label htmlFor="name" className="col-sm-6 col-form-label">
                Name
              </label>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  value={contact.name}
                  required
                />
              </div>
            </div>

            <div className="col-sm-6">
              <label htmlFor="phone" className="col-sm-6 col-form-label">
                Phone
              </label>
              <div className="col-sm-12">
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  onChange={handleInputChange}
                  value={contact.phone}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row my-1">
            <div className="col-sm-6">
              <button type="submit" className="btn btn-primary col-sm-4">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
}
