import UserItem from "./UserItem";

export default function UserList(props) {

  const handleScrolling = (event) => {
    if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
      props.loadMore()
    }
  }

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
          {props.data.map((user, index) => (
            <UserItem
              no={index + 1}
              key={user.id}
              itemId={user.id}
              name={user.name}
              phone={user.phone}
              sent={user.sent}
              delete={() => props.delete({id:user.id, sent:user.sent})}
              update={props.update}
              resend={props.resend}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
