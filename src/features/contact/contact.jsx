import UserList from "../../components/UserList";
import UserForm from "../../components/UserForm";
import UserSearch from "../../components/UserSearch";
import { useState } from "react";

export default function UserBox(props) {
  const [tab, setTab] = useState({
    tabId: "search-form",
  })

  const handleTabClick = (event) => {
    setTab({
      tabId: event.target.dataset.tab,
    });
  };

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
              <a className={tab.tabId === "search-form" ? "nav-link active" : "nav-link"} id="search" data-mdb-toggle="tab" data-tab="search-form" href="#search-form" role="tab" aria-controls="search-form" aria-selected="false" onClick={handleTabClick}>
                Search
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a className={tab.tabId === "add-form" ? "nav-link active" : "nav-link"} id="add" data-mdb-toggle="tab" data-tab="add-form" href="#add-form" role="tab" aria-controls="add-form" aria-selected="true" onClick={handleTabClick}>
                Add
              </a>
            </li>
          </ul>

          <div className="tab-content" id="ex1-content">
            <div className={tab.tabId === "search-form" ? "tab-pane fade show active" : "tab-pane fade"} id="search-form" role="tabpanel" aria-labelledby="search">
              <UserSearch />
            </div>
            <div className={tab.tabId === "add-form" ? "tab-pane fade show active" : "tab-pane fade"} id="add-form" role="tabpanel" aria-labelledby="add">
              <div className="form-group">
                <UserForm />
              </div>
            </div>
          </div>
          <hr />

          <UserList />
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
}
