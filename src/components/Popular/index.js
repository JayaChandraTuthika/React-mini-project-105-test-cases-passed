import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import Navbar from '../Navbar'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    status: statusConstants.initial,
    moviesList: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({status: statusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const getPopularMoviesApiUrl =
      'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(getPopularMoviesApiUrl, options)
    if (response.status === 200) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
        title: each.title,
      }))
      this.setState({status: statusConstants.success, moviesList: updatedData})
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  onRetryPopularMovies = () => {
    this.getPopularMovies()
  }

  renderPopularMovies = () => {
    const {moviesList} = this.state
    return (
      <>
        <ul className="popular-movies-list-container">
          {moviesList.map(each => (
            <Link className="link-item" to={`/movies/${each.id}`}>
              <li key={each.id} className="popular-movies-list-item">
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="popular-movie-image"
                />
              </li>
            </Link>
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderFailureView = () => (
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
        onClick={this.onRetryPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={100} width={100} />
    </div>
  )

  render() {
    const {status} = this.state
    let content
    switch (status) {
      case statusConstants.success:
        content = this.renderPopularMovies()
        break
      case statusConstants.failure:
        content = this.renderFailureView()
        break
      case statusConstants.inProgress:
        content = this.renderLoader()
        break

      default:
        content = null
        break
    }
    return (
      <div className="popular-main-bg">
        <Navbar />
        <div>{content}</div>
      </div>
    )
  }
}

export default Popular
