import { gql } from 'graphql-tag';

export const GET_SESSION_PAGE = gql`
  query GetSessionPage($id: ID!) {
    getSessionPage(id: $id) {
      date
      time
      duration
      host { photo firstName lastName profession }
      user { email firstName lastName timeZone }
      service { title }
    }
  }
`;

export const GET_AVAILABLE_DATE_TIMES = gql`
  query GetAvailableDateTimes($userId: ID!) {
    getAvailableDateTimes(userId: $userId) {
      date
      times { start end }
    }
  }
`;
