import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieDetailsPage extends Component {
  state = {
    status: statusConstants.initial,
    movieData: {},
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({status: statusConstants.inProgress})
    const {match} = this.props
    const {id} = match.params
    // console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const getMovieDetailsApiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(getMovieDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const movie = data.movie_details
      const updatedData = {
        id: movie.id,
        adult: movie.adult,
        backdropPath: movie.backdrop_path,
        budget: movie.budget,
        genres: movie.genres,
        overview: movie.overview,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
        similarMovies: movie.similar_movies,
        spokenLanguages: movie.spoken_languages,
        title: movie.title,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      }
      //   console.log(updatedData)
      this.setState({movieData: updatedData, status: statusConstants.success})
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  onRetry = () => {
    this.getMovieDetails()
  }

  renderSuccessView = () => {
    const {movieData} = this.state
    const {
      backdropPath,
      title,
      adult,
      runtime,
      releaseDate,
      overview,
      genres,
      spokenLanguages,
      voteCount,
      voteAverage,
      budget,
      similarMovies,
    } = movieData
    const hours = Math.floor(parseInt(runtime) / 60)
    const minutes = parseInt(runtime) % 60
    const year = format(new Date(releaseDate), 'yyyy')
    const fulldate = format(new Date(releaseDate), 'do MMMM yyyy')
    return (
      <>
        <div
          className="header-container-movie-details"
          style={{
            background: `linear-gradient(to right,rgba(0, 0, 0, 0.801) ,transparent),url(${backdropPath})`,
          }}
        >
          <Navbar />
          <div className="header-movie-details-container">
            <h1 className="header-title">{title}</h1>
            <div className="time-adult-year-container">
              <p className="header-runtime">
                {hours}h {minutes}m
              </p>
              <p className="header-adult">{adult ? 'A' : 'U/A'}</p>
              <p className="header-runtime">{year}</p>
            </div>
            <p className="header-overview">{overview}</p>
            <button type="button" className="header-play-btn">
              Play
            </button>
          </div>
        </div>
        <div className="lists-container">
          <div>
            <h1 className="list-category-heading">Genres</h1>
            <ul className="after-heading-category-list-container">
              {genres.map(each => (
                <li key={each.id} className="list-item-after-header">
                  <p>{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="list-category-heading">Audio Available</h1>
            <ul className="after-heading-category-list-container">
              {spokenLanguages.map(each => (
                <li key={each.id} className="list-item-after-header">
                  <p>{each.english_name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="after-heading-category-list-container">
            <h1 className="list-category-heading">Rating Count</h1>
            <p className="rating-count">{voteCount}</p>
            <h1 className="list-category-heading">Rating Average</h1>
            <p className="rating-count">{voteAverage}</p>
          </div>
          <ul className="after-heading-category-list-container">
            <h1 className="list-category-heading">Budget</h1>
            <p className="rating-count">{budget}</p>
            <h1 className="list-category-heading">Release date</h1>
            <p className="rating-count">{fulldate}</p>
          </ul>
        </div>
        <h1 className="similar-movies-heading">More like this</h1>
        <ul className="similar-movies-list-container">
          {similarMovies.map(each => (
            <li className="similar-movie-card" key={each.id}>
              <Link to={`/movies/${each.id}`}>
                <img
                  src={each.poster_path}
                  alt={each.title}
                  className="similar-movie-card-image"
                />
              </Link>
            </li>
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderFailureView = () => (
    <div className="movie-details-main-bg-container">
      <Navbar />
      <div className="failure-container-popular-movies">
        <img
          src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1677008253/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/Popular%20Movies/Failure-image_fk8bhw.svg"
          alt="failure view"
          className="failure-image-popular-movies"
        />
        <p className="failure-text-popular">
          Something went wrong. PLease try again
        </p>
        <button
          type="button"
          className="popular-try-again-btn"
          onClick={this.onRetry}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderLoaderView = () => (
    <div className="movie-details-main-bg-container">
      <Navbar />
      <div className="popular-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={100} width={100} />
      </div>
    </div>
  )

  render() {
    const {status} = this.state

    let content

    switch (status) {
      case statusConstants.success:
        content = this.renderSuccessView()
        break
      case statusConstants.failure:
        content = this.renderFailureView()
        break
      case statusConstants.inProgress:
        content = this.renderLoaderView()
        break
      default:
        content = null
        break
    }
    return <div className="movie-details-main-bg-container">{content}</div>
  }
}

export default MovieDetailsPage
