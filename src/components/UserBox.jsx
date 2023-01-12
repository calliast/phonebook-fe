import { Component } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import UserSearch from "./UserSearch";
import axios from "axios";

export default class UserBox extends Component {
  constructor(props) {
    super(props);
    this.params = {
      page: 1,
      pages: 1,
    };
    this.state = {
      users: [],
      tabId: "search-form",
    };
  }

  componentDidMount() {
    this.loadContact();
  }

  loadContact = async (query = {}) => {
    try {
      const fetching = await axios.get(
        `http://localhost:3039/api/phonebooks?`,
        {
          params: { ...this.params, ...query },
        }
      );
      const response = fetching.data;
      if (response.success) {
        this.params.page = response.data.page;
        this.params.pages = response.data.pages;
        this.params.name = query.name ? query.name : this.params.name;
        this.params.phone = query.phone ? query.phone : this.params.phone;
        console.log(
          "OP ~ LoadContact page/pages",
          this.params.page + "/" + this.params.pages
        );

        this.setState((state) => ({
          users: [
            ...(this.params.page === 1 ? [] : state.users),
            ...response.data.contacts.map((item) => {
              item.sent = true;
              return item;
            }),
          ],
        }));
      }
    } catch (error) {
      console.log("error ketika mau load data", error);
    }
  };

  loadMore = () => {
    if (this.params.page < this.params.pages) {
      this.params = {
        ...this.params,
        page: this.params.page + 1,
      };
      this.loadContact();
    }
  };

  addUser = async (name, phone) => {
    const id = Date.now();
    try {
      if (!this.params.name && !this.params.phone) {
        await this.setState(function (state) {
          return {
            users: [
              ...state.users,
              {
                id,
                name,
                phone,
                sent: true,
              },
            ],
          };
        });
      }

      const fetching = await axios.post(
        "http://localhost:3039/api/phonebooks",
        { name, phone }
      );

      const response = fetching.data;

      if (response.success && !this.params.name && !this.params.phone) {
        this.setState(function (state) {
          return state.users.map((item) => {
            if (item.id === id) {
              item.id = response.data.id;
              item.sent = true;
            }
            return item;
          });
        });
      }
    } catch (error) {
      console.log(error, "error saat add");
      if (!this.params.name && !this.params.phone) {
        this.setState(function (state) {
          return state.users.map((item) => {
            if (item.id === id) {
              item.sent = false;
            }
            return item;
          });
        });
      }
    }
  };

  updateContact = async ({ id, name, phone }) => {
    try {
      const fetching = await axios.put(
        `http://localhost:3039/api/phonebooks/${id}`,
        { id, name, phone }
      );

      const response = fetching.data;

      if (response.success) {
        this.setState(function (state) {
          return {
            users: state.users.map((item) => {
              if (item.id === response.data.id) {
                return {
                  id: response.data.id,
                  name: response.data.name,
                  phone: response.data.phone,
                  sent: true,
                };
              }
              return item;
            }),
          };
        });
      }
    } catch (error) {
      console.log("error saat updating data", error);
    }
  };

  deleteContact = async ({ id }) => {
    try {
      const fetching = await axios.delete(
        `http://localhost:3039/api/phonebooks/${id}`
      );

      const response = fetching.data;

      if (response.success) {
        if (response.data !== 0) {
          this.setState(function (state) {
            return {
              users: state.users.filter((item) => item.id !== id),
            };
          });
        }
      }
    } catch (error) {
      console.log("error saat deleting data", error);
    }
  };

  resendContact = async ({ id, name, phone }) => {
    try {
      const fetching = await axios.post(
        "http://localhost:3039/api/phonebooks",
        { name, phone }
      );

      const response = fetching.data;

      if (response.success) {
        this.setState(function (state) {
          return state.users.map((item) => {
            if (item.id === id) {
              item.id = response.data.id;
              item.sent = true;
            }
            return item;
          });
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  handleTabClick = (event) => {
    this.setState({
      tabId: event.target.dataset.tab,
    });
  };

  searchContact = (query = {}) => {
    this.params = {
      ...this.params,
      ...query,
      page: 1,
    };
    this.loadContact(query);
  };

  render() {
    return (
      <div className="container">
        <br />
        <div className="card">
          <div className="card-header my-2">
            <h1>Phonebook</h1>
          </div>
          <div className="card-body">
            <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className={
                    this.state.tabId === "search-form"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="search"
                  data-mdb-toggle="tab"
                  data-tab="search-form"
                  href="#search-form"
                  role="tab"
                  aria-controls="search-form"
                  aria-selected="false"
                  onClick={this.handleTabClick}
                >
                  Search
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={
                    this.state.tabId === "add-form"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="add"
                  data-mdb-toggle="tab"
                  data-tab="add-form"
                  href="#add-form"
                  role="tab"
                  aria-controls="add-form"
                  aria-selected="true"
                  onClick={this.handleTabClick}
                >
                  Add
                </a>
              </li>
            </ul>

            <div className="tab-content" id="ex1-content">
              <div
                className={
                  this.state.tabId === "search-form"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="search-form"
                role="tabpanel"
                aria-labelledby="search"
              >
                <UserSearch search={this.searchContact} />
              </div>
              <div
                className={
                  this.state.tabId === "add-form"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="add-form"
                role="tabpanel"
                aria-labelledby="add"
              >
                <div className="form-group">
                  <UserForm add={this.addUser} />
                </div>
              </div>
            </div>
            <hr />

            <UserList
              data={this.state.users}
              resend={this.resendContact}
              delete={this.deleteContact}
              update={this.updateContact}
              loadMore={this.loadMore}
            />
          </div>
        </div>
      </div>
    );
  }
}
