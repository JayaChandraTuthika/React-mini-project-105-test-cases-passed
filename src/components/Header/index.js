import {withRouter} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Header = props => {
  const {originalsMoviesList, headerStatus, onRetryData} = props
  console.log(Header)

  const onRetryHeader = () => {
    onRetryData()
  }
  if (headerStatus === statusConstants.success) {
    const posterMovieDetails =
      originalsMoviesList[
        Math.floor(Math.random() * originalsMoviesList.length)
      ]
    const {backdropPath, name, overview} = posterMovieDetails
    // console.log(posterMovieDetails)

    return (
      <div
        className="header-container"
        style={{
          background: `linear-gradient(to right,rgba(0, 0, 0, 0.801) ,transparent),url(${backdropPath})`,
        }}
      >
        <Navbar />
        <div className="header-info-text-container">
          <h1 className="header-movie-heading">{name}</h1>
          <p className="header-movie-description">{overview}</p>
          <button type="button" className="play-btn-header" testid="playButton">
            Play
          </button>
        </div>
      </div>
    )
  }
  if (headerStatus === statusConstants.failure) {
    return (
      <div className="header-container">
        <Navbar />
        <div className="failure-container-fetching-header">
          <img
            src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1676988437/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/Home%20page/Error-fetch-icon_ndhs8l.svg"
            alt="error"
            className="fetch-failure-image-slick"
          />
          <p className="fetch-failure-para">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            className="fetch-failure-try-again-btn"
            onClick={onRetryHeader}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="header-container">
      <Navbar />
      <div className="header-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={80} width={80} />
      </div>
    </div>
  )
}

export default withRouter(Header)
