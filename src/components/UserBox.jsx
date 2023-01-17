import { useState, createContext } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import UserSearch from "./UserSearch";
export const ParamsContext = createContext()

export default function UserBox() {
  const [tab, setTab] = useState("search-form");
  const [params, setParams] = useState({
    page: 1,
    pages: 1,
    mode: "and"
  })

  return (
    <div className="container">
      <br />
      <div className="card">
        <div className="card-header my-2">
          <h1>Phonebook</h1>
        </div>
        <ParamsContext.Provider value={{params, setParams}}>
        <div className="card-body">
          <ul className="nav nav-tabs mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className={
                  tab === "search-form" ? "nav-link active" : "nav-link"
                }
                id="search"
                data-mdb-toggle="tab"
                data-tab="search-form"
                href="#search-form"
                role="tab"
                aria-controls="search-form"
                aria-selected="false"
                onClick={() => setTab("search-form")}
              >
                Search
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className={tab === "add-form" ? "nav-link active" : "nav-link"}
                id="add"
                data-mdb-toggle="tab"
                data-tab="add-form"
                href="#add-form"
                role="tab"
                aria-controls="add-form"
                aria-selected="true"
                onClick={() => setTab("add-form")}
              >
                Add
              </a>
            </li>
          </ul>

          <div className="tab-content" id="ex1-content">
            <div
              className={
                tab === "search-form"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="search-form"
              role="tabpanel"
              aria-labelledby="search"
            >
              <UserSearch/>
            </div>
            <div
              className={
                tab === "add-form"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="add-form"
              role="tabpanel"
              aria-labelledby="add"
            >
              <div className="form-group">
                <UserForm/>
              </div>
            </div>
          </div>
          <hr />

          <UserList />
        </div>
        </ParamsContext.Provider>
      </div>
    </div>
  );
}
