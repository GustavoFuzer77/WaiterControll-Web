import styled from "styled-components";
import Colors from "../../styles/Colors";

export const Container = styled.div`
  display: flex;

  .void-config {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.2;
    cursor: default;
    pointer-events: none;
    user-select: none;
  }

  .logo-div {
    display: flex;
    align-items: center;
    gap: 16px;

    .title {
      margin-bottom: 16px;

      h1 {
        color: ${Colors.textGray};
      }

      span {
        color: ${Colors.textGray};
      }
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
        background: ${Colors.textGray};
      }
    }

    img {
      width: 105px;
      height: 105px;
    }
  }
`;

export const RightBar = styled.div`
  width: 132px;
  border: 1px solid ${Colors.backgroundLightGray600};
  background: ${Colors.backgroundRedMain};
  display: flex;
`;
