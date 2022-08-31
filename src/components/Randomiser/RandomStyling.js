import styled from "styled-components";

const Style = styled.section`
min-height: 100vh;
background-color: #d4d6d5;
display: flex;
flex-direction: column;
align-items: center;
padding: 2rem;

.wrapper {
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #225560;
  color: #FFF;
  p {
    font-weight: 600;
    font-style: italic;
    margin: 0 1rem 2rem 1rem;
  }
}
h2 {
  font-size: 3rem;
  font-weight: 700;
}
button {
  background-color: #310D20;
}
.card  {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .image {
    box-shadow: 0 0.1 0.5rem rgb(0 0 0 / 10%);
    border-radius: 1rem;
    background: #dbdbdb;
    width: 300px;
  }
}
`;

export default Style;