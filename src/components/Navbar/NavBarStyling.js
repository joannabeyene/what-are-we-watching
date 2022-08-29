import styled from "styled-components";

const Style = styled.section`
  nav {
    background-color: #171219;
    color: #FFFFFF;
    padding: 1rem 0;
    font-size: 1.5rem;
    
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-around;

      li {
        a {
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
        }
        a:visited {
            color: #FFFFFF;
          }
        .active {
          background:#225560;
        }
        a:hover {
          background:#225560;
        }
      }
    }
  }

  @media only screen and (max-width: 480px) {
    nav  {
      padding: 1rem;
      ul {
        padding: 1rem 0;
        flex-direction: column;  
        align-items: center;
        gap: 1.2rem;
      }
    }
  }
  
`;

export default Style;