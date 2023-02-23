import {Link} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const onGoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-bg-container">
      <img
        src="https://res.cloudinary.com/dds8wfxdw/image/upload/v1677068418/CCBP-mini%20projects/Movies%20website%20%28netflix%2Cprime%20clone%29/assets/Not-found%20route/not-found_tgzgeu.svg"
        alt="not found"
        className="not-found-image"
      />
      <div className="not-found-text-container">
        <h1 className="not-found-heading">Lost Your Way?</h1>
        <p className="not-found-para">
          we are sorry, the page you requested could not be found Please go back
          to the homepage.
        </p>
        <Link to="/">
          <button type="button" className="go-home-btn">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
