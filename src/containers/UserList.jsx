import UserItem from "./UserItem";
import { connect } from "react-redux";
import { deleteContact, loadContact, loadMore } from "../actions/PhoneBook_action";
import { Component } from "react";

class UserList extends Component {
  componentDidMount() {
    this.props.load();
  }

  handleScrolling = (event) => {
    if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
      this.props.loadMore();
    }
  };

  render() {
    return (
      <div className="table-responsive" style={{ overflowY: "scroll", height: 300 }} onScroll={this.handleScrolling}>
        <table className="table table-striped">
          <caption>There {this.props.params.result > 1 ? `are ${this.props.params.result} contacts` : `is only ${this.props.params.result} contact`}{this.props.params.name || this.props.params.phone ? ` found.` : '.'}</caption>
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
            {this.props.list.map((user, index) => (
              <UserItem
                no={index + 1}
                key={user.id}
                itemId={user.id}
                name={user.name}
                phone={user.phone}
                sent={user.sent}
                delete={() => this.props.delete(user.id)}
                resend={this.props.resend}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    list: state.contacts,
    params: state.params,
  };
};

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(loadContact()),
  loadMore: () => dispatch(loadMore()),
  delete: (id) => dispatch(deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
