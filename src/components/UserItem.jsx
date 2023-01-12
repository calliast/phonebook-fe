import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { resendContact, updateContact } from "../features/contact/contactSlice";

export default function UserItem(props) {
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    id: props.itemId,
    name: props.name,
    phone: props.phone,
  });

  const [edit, setEdit] = useState({
    isEdit: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleUpdateContact = useCallback(() => {
    const data = {
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
    };
    dispatch(updateContact(data));
    setEdit({
      isEdit: false,
    });
  }, [dispatch, contact]);

  const handleEdit = () => setEdit({ isEdit: true });

  const handleCancel = () => {
    setEdit({ isEdit: false });
    setContact({
      id: props.itemId,
      name: props.name,
      phone: props.phone,
    });
  };

  const handleResendContact = () => {
    const data = {
      id: props.itemId,
      name: props.name,
      phone: props.phone,
    };
    dispatch(resendContact(data));
  };

  return (
    <tr>
      <th scope="row">{props.no}</th>
      {edit.isEdit ? (
        <>
          <td>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input type="text" name="name" id="name" className="form-control col" onChange={handleInputChange} value={contact.name} />
              </div>
            </div>
          </td>
          <td>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input type="tel" name="phone" id="phone" className="form-control col" onChange={handleInputChange} value={contact.phone} />
              </div>
            </div>
          </td>
          <td>
            <button type="button" id="save-btn" className="btn btn-info mx-1" onClick={handleUpdateContact}>
              Save
            </button>
            <button type="button" id="cancel-btn" className="btn btn-secondary mx-1" onClick={handleCancel}>
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{props.name}</td>
          <td>{props.phone}</td>
          <td>
            {props.sent ? (
              <>
                <button type="button" id="edit-btn" className="btn btn-success mx-1" onClick={handleEdit}>
                  Edit
                </button>
                <button type="button" id="delete-btn" className="btn btn-danger mx-1" onClick={props.delete}>
                  Delete
                </button>
              </>
            ) : (
              <button id="resend-button" type="button" className="btn btn-warning mx-1" onClick={handleResendContact}>
                Resend
              </button>
            )}
          </td>
        </>
      )}
    </tr>
  );
}
