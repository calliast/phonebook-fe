import { Component, Fragment } from "react";

export default class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      isSearch: false,
      mode: "and",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnReset = () => {
    this.setState({
      name: "",
      phone: "",
      isSearch: false,
      mode: "and",
    });
    this.props.search({
      name: "",
      phone: "",
    });
  };

  handleModeChanges = (event) => {
    this.setState({
      mode: event.target.value,
    });
  };

  handleOnSearchSubmit = (event) => {
    event.preventDefault();
    if (this.state.name === "" && this.state.phone === "") {
      return event.preventDefault();
    }
    this.props.search({
      name: this.state.name,
      phone: this.state.phone,
      mode: this.state.mode,
    });
    this.setState({
      isSearch: true,
    });
  };

  render() {
    return (
      <Fragment>
        <div className="row">
          <h2>Search contact</h2>
        </div>
        <form id="search-contact-form" onSubmit={this.handleOnSearchSubmit}>
          <div className="row my-1">
            <div className="row my-1">
              <div className="col-sm-6">
                <label
                  htmlFor="name-search"
                  className="col-sm-4 col-form-label"
                >
                  Name
                </label>
                <div className="col-sm-12">
                  <input
                    type="text"
                    className="form-control"
                    id="name-search"
                    name="name"
                    onChange={this.handleInputChange}
                    value={this.state.name}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <label
                  htmlFor="phone-search"
                  className="col-sm-4 col-form-label"
                >
                  Phone
                </label>
                <div className="col-sm-12">
                  <input
                    type="tel"
                    className="form-control"
                    id="phone-search"
                    name="phone"
                    onChange={this.handleInputChange}
                    value={this.state.phone}
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
                  {this.state.isSearch && (
                    <div className="col-sm-6">
                      <button
                        type="button"
                        className="btn btn-warning col-sm-12"
                        onClick={this.handleOnReset}
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
                        checked={this.state.mode === "and"}
                        onChange={this.handleModeChanges}
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
                        checked={this.state.mode === "or"}
                        onChange={this.handleModeChanges}
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
}
