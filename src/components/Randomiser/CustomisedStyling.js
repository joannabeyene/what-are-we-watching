import styled from "styled-components";

const Style = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .language, .genre {
    padding: 0.3rem 0;
    display: flex;
    flex-direction: column;
  }

  .form {
  }
  .movies {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 20px;
    padding-top: 20px;
    padding-bottom: 20px;

    .card {
      width: 150px;
      min-width: 150px;
    }
  }
  .image {
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    border-radius: 10px;
    width: 100%;
    min-height: calc(150px * 1.5);
    height: calc(150px * 1.5);
    background: #dbdbdb;
    overflow: hidden;
    .wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      top: 0;
      left: 0;
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }

  .content {
    h2 {
      font-size: 15px; 
    }
  }
  //Tablet
  @media only screen and (min-width: 481px) and (max-width: 768px) {
    .movies {
      display: grid;
      grid-template-columns: auto auto auto;
      gap: 20px;
    }
  }


  //Mobile
  @media only screen and (max-width: 480px) {
    .movies {
      display: block;
      .card {
        padding-bottom: 20px;
      }
    }
  } 
  
`;

export default Style;