import { Component } from "react";

export default class UserBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { name: "Ikhsan", phone: "0229393921" },
        { name: "rafi", phone: "32747239" },
      ],
      name: "",
      phone: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState(function (state, props) {
      return {
        users: [
          ...state.users,
          {
            name: this.state.name,
            phone: this.state.phone,
          },
        ],
      };
    });
    this.setState({
      name: "",
      phone: "",
    });
  };

  render() {
    return (
      <div className="container">
        <br />
        <div className="card">
          <div className="card-header">
            <h1>User List</h1>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleOnSubmit}>
              <div className="row mb-3">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={this.handleInputChange}
                    value={this.state.name}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <label htmlFor="phone" className="col-sm-2 col-form-label">
                  Phone
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    onChange={this.handleInputChange}
                    value={this.state.phone}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card-footer"></div>
        </div>
      </div>
    );
  }
}
