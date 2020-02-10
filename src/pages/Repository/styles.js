import styled from 'styled-components';

export const Header = styled.div`
  border-bottom: 1px solid #eee;

  h2 {
    display: flex;
    align-items: center;
    color: #444;
    font-weight: normal;

    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }

  p {
    margin-top: 25px;
    color: #999;
    line-height: 18px;
    font-style: italic;
    padding-bottom: 15px;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 22px;
  height: 100%;
`;

export const IssuesList = styled.ul`
  margin-top: 15px;

  li {
    padding: 8px;
    background: #f5f5f5;
    display: flex;
    border-radius: 5px;

    img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    & + li {
      margin-top: 15px;
    }

    div {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;

      strong {
        a {
          text-decoration: none;
          color: #333;
          font-size: 15px;

          &:hover {
            color: #3d7bff;
          }
        }

        p {
          display: inline;
          font-size: 11px;
          color: #666;
          background: #ededed;
          padding: 3px;
          border-radius: 5px;
          margin-left: 10px;
        }
      }

      small {
        margin-top: 10px;
        color: #999;
      }
    }
  }
`;

export const Arrows = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-evenly;

  button {
    background: transparent;
    cursor: pointer;

    &[disabled] {
      opacity: 0.5;
    }
  }
`;

export const TypeIssue = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 20px 0;

  button {
    padding: 5px 15px;
    background: #3d7bff;
    font-size: 15px;
    color: #fff;

    &:nth-of-type(${props => props.current + 1}) {
      opacity: 0.5;
    }
  }
`;
