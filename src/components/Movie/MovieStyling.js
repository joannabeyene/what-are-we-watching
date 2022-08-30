import styled from "styled-components";

const Style = styled.section`
color: #FFF; 
background-color: #310D20;

button {
    background-color: #F0803C;
}

.banner {
    height: 50vh;
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
    }
}


.movie-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    flex-direction: column;
    gap: 2rem;

    .info {
        width: 70%;
        padding-left: 2rem;
        position: relative;

        .title {
            font-size: 4rem;
            line-height: 1;
        }
        .genres {
            & > * ~ * {
                margin-left: 0.5rem;
            }
            .genre {
                padding: 0.5rem 1.5rem;
                border: 2px solid #FFF;
                border-radius: 2rem;
                font-size: 0.8rem;
                font-weight: 600;
            }
        }
    }
}

.crew {
    h2, p {
        margin: 0;
    }
    h2 {
        margin-bottom: 0.5rem;
    }
}
.casts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 10px;
    padding-bottom: 2rem;
    .image {
        padding-top: 160px;
        background-position: center;
        background-size: cover;
        margin-bottom: 0.5rem;
    }

    .name{
        font-size: 0.8rem;
    }

}
.trailer-wrapper {
    padding: 4rem;
    .trailer {
        overflow: hidden;
        padding-top: 56.25%;
        position: relative;
    
        iframe {
            position: absolute;
            border: none;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    
    }
}

//Mobile

  @media only screen and (max-width: 480px) {
   .movie-content { 
        .info {
            width: 100%;
            padding-left: 0;

            .title {
                font-size: 3rem;
            }
        }
    }
  }
`;

export default Style;