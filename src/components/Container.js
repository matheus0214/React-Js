import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  border-radius: 5px;
  background: #fff;
  margin: 80px auto;
  padding: 40px;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;
