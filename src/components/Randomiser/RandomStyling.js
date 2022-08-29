import styled from "styled-components";

const Style = styled.section`
min-height: 100vh;
background-color: #d4d6d5;
display: flex;
flex-direction: column;
align-items: center;
padding: 2rem;

.wrapper {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-weight: 600;
    font-style: italic;
  }
}
h2 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
}
button {
  background-color: #310D20;
  padding: 0.5rem 3rem;
}
.card  {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  gap: 1rem;

  .image {
    box-shadow: 0 0.1 0.5rem rgb(0 0 0 / 10%);
    border-radius: 1rem;
    background: #dbdbdb;
    width: 300px;
  }
}

@media only screen and (max-width: 480px) {
  .card {

  }
}

  
`;

export default Style;