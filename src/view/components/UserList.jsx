import UserItem from "./UserItem";
import { useDispatch, useSelector } from "react-redux";
import { loadContact, loadMore, deleteContact } from "../features/contact/contactSlice";
import { useEffect } from "react";

export default function UserList(props) {
  const contacts = useSelector((state) => state.contact.contacts);
  const info = useSelector((state) => state.contact.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadContact());
  }, [dispatch]);

  const handleScrolling = (event) => {
    if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
      dispatch(loadMore());
    }
  };

  return (
    <div className="table-responsive" style={{ overflowY: "scroll", height: 300 }} onScroll={handleScrolling}>
      <table className="table table-striped">
        <caption>
          There {info.result > 1 ? `are ${info.result} contacts` : `is only ${info.result} contact`}
          {info.name || info.phone ? ` found.` : "."}
        </caption>
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
            <UserItem no={index + 1} key={user.id} itemId={user.id} name={user.name} phone={user.phone} sent={user.sent} delete={() => dispatch(deleteContact({ id: user.id }))} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
