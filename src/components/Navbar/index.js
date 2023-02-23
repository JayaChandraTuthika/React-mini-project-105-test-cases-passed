import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

class Navbar extends Component {
  state = {
    searchInput: '',
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchInputData = () => {
    const {searchInput} = this.state
    const {onSearch} = this.props
    onSearch(searchInput)
  }

  render() {
    const {searchInput} = this.state
    let activeTab
    const {match} = this.props
    const {path} = match
    switch (path) {
      case '/':
        activeTab = 'home'
        break
      case '/popular':
        activeTab = 'popular'
        break
      case '/search':
        activeTab = 'search'
        break
      default:
        activeTab = null
        break
    }
    return (
      <div className="navbar-bg">
        <div>
          <img
            src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1676920782/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/LOGO_ycujjt.png"
            alt="website logo"
            className="website-logo"
          />
        </div>
        <ul className="nav-links-list-container">
          <li className="nav-links-list-item">
            <Link
              to="/"
              className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-links-list-item">
            <Link
              to="/popular"
              className={`nav-link ${activeTab === 'popular' ? 'active' : ''}`}
            >
              Popular
            </Link>
          </li>
        </ul>
        <ul className="profile-search-list-container">
          <li className="nav-links-list-item">
            {activeTab === 'search' ? (
              <div className="search-input-btn-container">
                <input
                  type="search"
                  className="search-input"
                  onChange={this.onChangeSearch}
                  value={searchInput}
                />
                <button
                  type="button"
                  className="search-button search-active"
                  testid="searchButton"
                  onClick={this.onSearchInputData}
                >
                  <HiOutlineSearch className="search-icon" />
                </button>
              </div>
            ) : (
              <Link to="/search" className="search-route-link">
                <button
                  type="button"
                  className="search-button"
                  testid="searchButton"
                >
                  <HiOutlineSearch className="search-icon" />
                </button>
              </Link>
            )}
          </li>
          <li className="nav-links-list-item">
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1676973451/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/Home%20page/Avatar_maai79.svg"
                alt="profile"
                className="profile-pic"
              />
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Navbar)
