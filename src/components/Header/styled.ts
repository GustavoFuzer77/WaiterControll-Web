import styled from "styled-components";
import Colors from "../../styles/Colors";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 15rem;
  padding: 32px 124px;
  background-color: ${Colors.backgroundRedMain};
  align-items: center;

  .group-1 {
    display: flex;
    flex-direction: column;

    .subText {
      p {
        font-size: 36px;
        font-weight: 600;
      }
    }
  }

  .group-2 {
    display: flex;
    align-items: center;
    gap: 16px;

    .title {
      margin-bottom: 16px;
    }

    span {
      font-size: 18.5px;
      color: #fff;
      position: relative;

      &::after {
        content: "";
        max-width: 40px;
        width: 100%;
        position: absolute;
        top: 12px;
        left: 75px;
        height: 0.2px;
        background: #fff;
      }
    }

    img {
      width: 105px;
      height: 105px;
    }
  }
`;
