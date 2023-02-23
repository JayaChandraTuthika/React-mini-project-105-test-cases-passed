import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import SlickComponent from '../SlickComponent'
import TrendingSlickComponent from '../TrendingSlickComponent'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    headerStatus: statusConstants.initial,

    originalsMoviesList: [],
  }

  componentDidMount() {
    this.getOriginalsMovies()
  }

  getOriginalsMovies = async () => {
    this.setState({headerStatus: statusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const getOriginalsMoviesApiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(getOriginalsMoviesApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        name: each.title,
      }))
      this.setState({
        originalsMoviesList: updatedData,
        headerStatus: statusConstants.success,
      })
    }
  }

  renderOriginals = () => {
    const {originalsMoviesList} = this.state
    return (
      <>
        <SlickComponent moviesList={originalsMoviesList} />
        <Footer />
      </>
    )
  }

  renderLoaderSLickComponent = () => (
    <div className="slick-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      <Footer />
    </div>
  )

  onRetryData = () => {
    this.getOriginalsMovies()
  }

  renderFailureSlickData = () => (
    <>
      <div className="failure-container-fetching">
        <img
          src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1676988437/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/Home%20page/Error-fetch-icon_ndhs8l.svg"
          alt="failure view"
          className="fetch-failure-image-slick"
        />
        <p className="fetch-failure-para">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="fetch-failure-try-again-btn"
          onClick={this.onRetryData}
        >
          Try Again
        </button>
      </div>
      <Footer />
    </>
  )

  render() {
    const {originalsMoviesList, headerStatus} = this.state

    let originals

    switch (headerStatus) {
      case statusConstants.success:
        originals = this.renderOriginals()
        break
      case statusConstants.inProgress:
        originals = this.renderLoaderSLickComponent()
        break
      case statusConstants.failure:
        originals = this.renderFailureSlickData()
        break
      default:
        originals = null

        break
    }

    return (
      <div className="home-bg-container">
        <Header
          originalsMoviesList={originalsMoviesList}
          headerStatus={headerStatus}
          onRetryData={this.onRetryData}
        />
        <h1 className="slick-movies-category-heading">Trending Now</h1>
        <TrendingSlickComponent />
        <h1 className="slick-movies-category-heading">Originals</h1>
        {originals}
      </div>
    )
  }
}

export default Home
