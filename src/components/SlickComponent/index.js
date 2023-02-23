import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import './index.css'

const SlickComponent = props => {
  const {moviesList} = props
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="main-slick-bg-container">
      <Slider {...settings}>
        {moviesList.map(each => (
          <div className="slick-item-container" key={each.id}>
            <img
              className="movie-slick-image"
              src={each.posterPath}
              alt={each.name}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SlickComponent
