import styled from "styled-components";
import Colors from "../../styles/Colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  width: 400px;
  max-width: 400px;
  border-right: 1px solid ${Colors.backgroundLightGray300};

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    background-color: ${Colors.backgroundRedMain};
    border-bottom: 1px solid ${Colors.backgroundLightGray600};

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
  }

  body {
    padding: 32px;
    height: max-content;
    flex: 1;
    /* height: 100%; */
  }

  footer {
    padding: 32px;

    .go-back {
      text-decoration: none;
      border: none;
      font-weight: 400;
      color: ${Colors.textGray};
      background-color: "#fafafa";
      width: 100%;
      border-radius: 16px;
      max-height: 60px;
      height: 45px;
      min-height: 16px;
    }
  }
`;
