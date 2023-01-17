import { gql } from "@apollo/client";

export const LOAD_CONTACT = gql`
  query loadContact(
    $page: Int! = 1
    $mode: String = "and"
    $name: String
    $phone: String
  ) {
    load(page: $page, mode: $mode, name: $name, phone: $phone) {
      data {
        params {
          rowCount
          totalCount
          page
          pages
          name
          phone
          mode
        }
        contacts {
          id
          name
          phone
        }
      }
      success
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation addContact($name: String, $phone: String) {
    add(input: { name: $name, phone: $phone }) {
      success
      data {
        id
        name
        phone
      }
    }
  }
`;

export const REMOVE_CONTACT = gql`
  mutation removeContact($id: Int!) {
    remove(id: $id) {
      success
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact($id: Int!, $name: String, $phone: String) {
    update(id: $id, input: { name: $name, phone: $phone }) {
      success
      data {
        id
        name
        phone
      }
    }
  }
`;
