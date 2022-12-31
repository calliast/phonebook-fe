import { Component } from "react";
import { connect } from "react-redux";
import { resendContact, updateContact } from "../actions/PhoneBook_action";

class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.itemId,
      name: this.props.name,
      phone: this.props.phone,
      isEdit: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleUpdateContact = () => {
    const data = {
      id: this.state.id,
      name: this.state.name,
      phone: this.state.phone,
    };
    this.props.update(data);
    this.setState({
      isEdit: false,
    });
  };

  handleEdit = () => this.setState({ isEdit: true });

  handleCancel = () => {
    this.setState({ isEdit: false });
    this.setState({
      id: this.props.itemId,
      name: this.props.name,
      phone: this.props.phone,
    });
  };

  handleResendContact = () => {
    this.props.resend({
      id: this.props.itemId,
      name: this.props.name,
      phone: this.props.phone,
    });
  };

  render() {
    return (
      <tr>
          <th scope="row">{this.props.no}</th>
          {this.state.isEdit ? (
            <>
              <td>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input type="text" name="name" id="name" className="form-control col" onChange={this.handleInputChange} value={this.state.name} />
                  </div>
                </div>
              </td>
              <td>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input type="tel" name="phone" id="phone" className="form-control col" onChange={this.handleInputChange} value={this.state.phone} />
                  </div>
                </div>
              </td>
              <td>
                <button type="button" id="save-btn" className="btn btn-info mx-1" onClick={this.handleUpdateContact}>
                  Save
                </button>
                <button type="button" id="cancel-btn" className="btn btn-secondary mx-1" onClick={this.handleCancel}>
                  Cancel
                </button>
              </td>
            </>
          ) : (
            <>
              <td>{this.props.name}</td>
              <td>{this.props.phone}</td>
              <td>
                {this.props.sent ? (
                  <>
                    <button type="button" id="edit-btn" className="btn btn-success mx-1" onClick={this.handleEdit}>
                      Edit
                    </button>
                    <button type="button" id="delete-btn" className="btn btn-danger mx-1" onClick={this.props.delete}>
                      Delete
                    </button>
                  </>
                ) : (
                  <button id="resend-button" type="button" className="btn btn-warning mx-1" onClick={this.handleResendContact}>
                    Resend
                  </button>
                )}
              </td>
            </>
          )}
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resend: ({ id, name, phone }) => dispatch(resendContact({ id, name, phone })),
  update: ({ id, name, phone }) => dispatch(updateContact({ id, name, phone })),
});

export default connect(null, mapDispatchToProps)(UserItem);
