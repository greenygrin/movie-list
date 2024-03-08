import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './Detail.module.css'

function Detail() {
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState({})

  const { id } = useParams()
  const getMovie = useCallback(async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    const json = await response.json()
    setDetails(json.data.movie)
    setLoading(false)
  }, [id])
  useEffect(() => {
    getMovie()
  }, [getMovie])

  return (
    <>
      {loading ? (
        <div className='loader'>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <Link to="/" className={styles.link}>Go Back</Link>
          <div className={styles.details}>
            <h1 className={styles.title}>{details.title}</h1>
            <img src={details.large_cover_image} alt={details.title_long} /><br />
            <div className={styles.description}>
              <dl>
                <dt>Year</dt>
                <dd>{details.year}</dd>
                <dt>Rating</dt>
                <dd>{details.rating}</dd>
                <dt>Runtime</dt>
                <dd>{details.runtime}</dd>
                <dt>Genres</dt>
                <dd>{details.genres.join(', ')}</dd>
                <dt>Like Count</dt>
                <dd>{details.like_count}</dd>
                <dt>Language</dt>
                <dd>{details.language}</dd>
                <dt>Description</dt>
                <dd>{details.description_full || '-'}</dd>
              </dl>
            </div>
          </div>
          <Link to="/" className={styles.link}>Go Back</Link>
        </>
      )}
    </>
  )
}

export default Detail
