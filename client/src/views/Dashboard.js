import { useState, useEffect } from "react"
import useAuth from "../components/useAuth"
import Player from "../components/Player"
import TrackSearchResult from "../components/TrackSearchResult"
import ReviewForm from "../components/ReviewForm"
import ReviewList from "../components/ReviewList"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
  clientId: "c864e0c624d447d08a714efe248a3c06",
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()

  const [review, setReview] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //! GET ALL REVIEWS
  useEffect(() => {
    axios.get('http://localhost:8000/api/reviews')
      .then(res => {
        // console.log(res.data.results)
        setReview(res.data.results);
        setLoaded(true);
        res.data.results.sort((a, b) => {
              if (b.rating < a.rating) return -1;
              if (b.rating > a.rating) return 1;
      })
      })
      .catch(err => console.error(err));
  }, []);

  const createNewReview = (newReview) => {
    setReview([...review, newReview]);
  }

//! DELETE 
  // FILTER OUT AFTER DELETE
  const removeFromDom = reviewId => {
    setReview(review.filter(review => review._id !== reviewId));
  }

//! SPOTIFY API 
  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
  }

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])


//! PAGE RENDER 
  return (
    <div className="body">
      <div className="logo content">
        <h2>TideTunes</h2>
        <h2>TideTunes</h2>
      </div>

      <div className="dashboard">
        <div className="player">
          <Container className="d-flex flex-column py-2" style={{ height: "87vh" }}>
            <Form.Control
              type="search"
              placeholder="Search Songs/Artists"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
              {searchResults.map(track => (
                <TrackSearchResult
                  track={track}
                  key={track.uri}
                  chooseTrack={chooseTrack}
                />
              ))}
            </div>
            <div>
              <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
          </Container>
        </div>
        <div className="reviewdashboard">
          <h1 className='reviewsheader'>All Reviews</h1>
          <div className="flex-grow-1 my-2" style={{ overflowY: "auto", maxHeight: "250px", minHeight: "250px" }}>
            {loaded && <ReviewList reviews={review} removeFromDom={removeFromDom} />}
          </div>
          <hr />
          <h1 className='reviewsheader'>New Review</h1>
          <div className="flex-grow-1 my-2" style={{ overflowY: "auto", maxHeight: "450px" }}>
            <ReviewForm createNewReview={createNewReview} />
          </div>
        </div>
      </div>
    </div>
  )
}
