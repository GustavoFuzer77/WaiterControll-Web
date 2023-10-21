import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  height: 80px;
  padding: 12px;
  border: 1px solid #2c2c2c;
  margin-top: 16px;
  border-radius: 12px;

  h1 {
    font-size: 14px;
  }

  .icons-methods {
    display: flex;
    align-items: center;
    gap: 12px;

    button{
      border: none;
      background: #fff;
    }
  }
`;
