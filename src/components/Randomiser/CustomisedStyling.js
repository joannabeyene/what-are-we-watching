import styled from "styled-components";

const Style = styled.section`
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;
padding: 2rem;
background-color: #d4d6d5;

.underline {
  text-decoration: underline;
}
.welcome {
  padding: 2rem;
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  h1 {
    font-size: 3rem;
    text-align: center;
    padding: 1rem;
  }
  h1, h2{
    margin: 0;
  }
  h2 {
    font-style: italic;
    font-weight: 600;
    font-size: 1rem;
  }
   
}
button {
  background-color: #F0803C;
}

.card {
  background-color: #225560;
  border-radius: 1rem;
  color: #FFF;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1rem 0;
    h2 {
      margin: 0;
      font-size: 1rem; 
    }
  }
}
.movies-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.language, .genre {
  padding: 0.3rem 0;
  display: flex;
  flex-direction: column;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #FFF;
  border: solid .05px #310D20;
  border-radius: 3rem;
  background-color: #310D20;
  .content {
    display: flex;
    gap: 1rem;
    padding: 1rem;

    label {
      margin-bottom: 0.5rem;
    }
    
  }
}
.movies-wrapper {
  .movies {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;

    .card {
      width: 10rem;
      .image {
        box-shadow: 0 0.1 0.5rem rgb(0 0 0 / 10%);
        width: 100%;
        min-height: calc(9rem * 1.5);
        height: calc(9rem * 1.5);
        background: #dbdbdb;
        overflow: hidden;
        border-radius: 1rem 1rem 0 0;

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
    }
  }
}

//Tablet
@media only screen and (min-width: 481px) and (max-width: 768px) {
  .welcome {
    h1 {
    font-size: 1.7rem;
    }
  }
  .movies-wrapper {
    .movies {
      display: grid;
      grid-template-columns: auto auto auto;
      gap: 2rem;
    }
  }
}

//Mobile
@media only screen and (max-width: 480px) {
  .welcome {
    h1 {
      font-size: 1.5rem;
    }
  }
  .form {
    h2 {
      font-size: 1.2rem;
    }
    .content {
      flex-direction: column;
    }
  }

  .carousel-wrapper {
    width: 90%;
    max-width: 500px;
    height: 50%;
    display: flex;
    position: relative;

    .carousel {
      display: flex;
      height: 100%;
      width: 100%;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      gap: 1rem;
      padding: 2rem;

      .carousel-item {
        display: flex;
        flex-direction: column;
        flex: 1 0 100%;
        scroll-snap-align: start;
        align-items: center;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 1rem 1rem 0 0;
        }
      }
    }
  }
}

  
`;

export default Style;