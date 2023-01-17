import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_CONTACT, UPDATE_CONTACT, LOAD_CONTACT } from "../gql/query";

export default function UserItem(props) {
  const [contact, setContact] = useState({
    id: props.id,
    name: props.name,
    phone: props.phone,
  });

  const [edit, setEdit] = useState(false);

  const [removeContact, { loading: loadingRemove, error: errorRemove }] = useMutation(REMOVE_CONTACT, {
    refetchQueries: [{query: LOAD_CONTACT}],
  });

  const [updateContact, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [{query: LOAD_CONTACT}],
    onCompleted: () => {
      setEdit(false);
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleUpdateContact = async () => {
    const data = {
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
    };
    updateContact({variables: data})
    
  };

  const handleCancel = () => {
    setEdit(false);
    setContact({
      id: props.id,
      name: props.name,
      phone: props.phone,
    });
  };

  if (loadingUpdate || loadingRemove)
    return (
      <tr className="d-flex justify-content-center">
        <td className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </td>
      </tr>
    );

  if (errorRemove || errorUpdate)
    return (
      <tr className="alert alert-danger" role="alert">
        <td>
          {errorUpdate.name || errorRemove.name}: {errorUpdate.message || errorRemove.message}
        </td>
      </tr>
    );

  return (
    <tr>
      <th scope="row">{props.no}</th>
      {edit ? (
        <>
          <td>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control col"
                  onChange={handleInputChange}
                  value={contact.name}
                />
              </div>
            </div>
          </td>
          <td>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="form-control col"
                  onChange={handleInputChange}
                  value={contact.phone}
                />
              </div>
            </div>
          </td>
          <td>
            <button
              type="button"
              id="save-btn"
              className="btn btn-info mx-1"
              onClick={handleUpdateContact}
            >
              Save
            </button>
            <button
              type="button"
              id="cancel-btn"
              className="btn btn-secondary mx-1"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{props.name}</td>
          <td>{props.phone}</td>
          <td>
            <button
              type="button"
              id="edit-btn"
              className="btn btn-success mx-1"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
            <button
              type="button"
              id="delete-btn"
              className="btn btn-danger mx-1"
              onClick={() =>
                removeContact({
                  variables: {
                    id: props.id,
                  },
                })
              }
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
