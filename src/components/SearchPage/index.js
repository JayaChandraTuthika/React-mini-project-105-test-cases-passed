import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchPage extends Component {
  state = {
    status: statusConstants.initial,
    searchInput: '',
    searchedMoviesList: [],
  }

  onSearch = searchText => {
    this.setState({searchInput: searchText}, this.getSearchedMoviesList)
  }

  getSearchedMoviesList = async () => {
    this.setState({status: statusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const searchMoviesApiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(searchMoviesApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        title: each.title,
        posterPath: each.poster_path,
        backdropPath: each.backdrop_path,
      }))

      this.setState({
        status: statusConstants.success,
        searchedMoviesList: updatedData,
      })
    } else {
      this.setState({status: statusConstants.failure})
    }
  }

  renderSearchedMovies = () => {
    const {searchedMoviesList, searchInput} = this.state
    if (searchedMoviesList.length !== 0) {
      return (
        <ul className="searched-movies-list-container">
          {searchedMoviesList.map(each => (
            <li key={each.id} className="search-movie-list-item">
              <Link to={`/movies/${each.id}`} className="link-style">
                <img
                  src={each.backdropPath}
                  alt={each.title}
                  className="movie-list-item-image"
                />
              </Link>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="failure-container-search">
        <img
          src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1677053178/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/Search%20Page/no-movies_nzyzeq.svg"
          alt="no movies"
          className="failure-image-popular-movies"
        />
        <p className="failure-text-popular">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  searchAgain = () => {
    this.getSearchedMoviesList()
  }

  renderFailureView = () => (
    <div className="failure-container-search">
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
        onClick={this.searchAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={100} width={100} />
    </div>
  )

  render() {
    const {status} = this.state
    let content
    switch (status) {
      case statusConstants.success:
        content = this.renderSearchedMovies()
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
    return (
      <div className="search-page-bg-container">
        <Navbar onSearch={this.onSearch} />
        <div className="search-container-bottom-section">{content}</div>
      </div>
    )
  }
}

export default SearchPage
