import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
  
//! PAGE RENDER
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} alt={{}} style={{ height: "64px", width: "64px", margin: "0px 5px"}} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="muted">{track.artist}</div>
      </div>
    </div>
  )
}
