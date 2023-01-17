import UserItem from "./UserItem";
import { useQuery } from "@apollo/client";
import { LOAD_CONTACT } from "../gql/query";
import { useState, useContext } from "react";
import { ParamsContext } from "./UserBox";

export default function UserList(props) {
  const [contacts, setContacts] = useState([]);
  const { params, setParams } = useContext(ParamsContext);

  const { loading, error } = useQuery(LOAD_CONTACT, {
    variables: {
      page: params.page,
      mode: params.mode,
      name: params.name,
      phone: params.phone,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ load: { data } }) => {
      setParams({
        page: data.params.page,
        pages: data.params.pages,
        name: data.params.name ? data.params.name : params.name,
        phone: data.params.phone ? data.params.phone : params.phone,
        mode: data.params.mode ? data.params.mode : "and",
      });
      setContacts([...(params.page === 1 ? [] : contacts), ...data.contacts]);
    },
  });

  const handleScrolling = (event) => {
    if (
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    ) {
      if (params.page < params.pages) {
        setParams({
          ...params,
          page: params.page + 1,
        });
      }
    }
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
    <div
      className="table-responsive"
      style={{ overflowY: "scroll", height: 300 }}
      onScroll={handleScrolling}
    >
      <table className="table table-striped">
        <caption>List of contact</caption>
        <thead className="thead-dark">
          <tr>
            <th scope="col" className=" bg-white sticky-top">
              #
            </th>
            <th scope="col" className=" bg-white sticky-top">
              Name
            </th>
            <th scope="col" className=" bg-white sticky-top">
              Phone
            </th>
            <th scope="col" className=" bg-white sticky-top">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((user, index) => (
            <UserItem
              no={index + 1}
              key={user.id}
              id={user.id}
              name={user.name}
              phone={user.phone}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
