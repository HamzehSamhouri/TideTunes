import React from "react"
import { Container } from "react-bootstrap"

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=c864e0c624d447d08a714efe248a3c06&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {

//! PAGE RENDER 
  return (
    <div className="body">
      <Container className="d-flex flex-column justify-content-center login">
        <div class="content">
          <h2>TideTunes</h2>
          <h2>TideTunes</h2>
        </div>
        <a className="btn" href={AUTH_URL}>
          Login With Spotify
        </a>
      </Container>
    </div>

  )
}