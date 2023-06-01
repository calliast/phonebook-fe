import { Fragment, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contact/contactSlice";

export default function UserForm(props) {
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };
  
  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(addContact({name:contact.name, phone: contact.phone}));
      setContact({
        name: "",
        phone: "",
      });
    },
    [dispatch, contact]
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
              <label htmlFor="name" className="col-sm-4 col-form-label">
                Name
              </label>
              <div className="col-sm-12">
                <input type="text" className="form-control" id="name" name="name" onChange={handleInputChange} value={contact.name} required />
              </div>
            </div>

            <div className="col-sm-6">
              <label htmlFor="phone" className="col-sm-4 col-form-label">
                Phone
              </label>
              <div className="col-sm-12">
                <input type="tel" className="form-control" id="phone" name="phone" onChange={handleInputChange} value={contact.phone} required />
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