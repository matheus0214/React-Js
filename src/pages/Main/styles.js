import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  padding: 20px 0;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#f00' : '#ccc')};
    padding: 8px;
    border-radius: 5px;
    color: #333;
  }
`;

export const Button = styled.button`
  padding: 0 15px;
  margin-left: 15px;
  background: #3d7bff;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;

export const List = styled.ul`
  margin-top: 15px;
  list-style-type: none;

  li {
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 16px;
    padding: 15px 0;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      text-decoration: none;
      text-transform: uppercase;
      color: #3d7bff;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
