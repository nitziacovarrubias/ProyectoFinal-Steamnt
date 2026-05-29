import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import "./GameDetail.css";


function GameDetail() {

  const dispatch = useDispatch()

  const { id } = useParams();

  const {
    juego,
    loading,
    error
  } = useSelector(state => state.juegos);

  console.log(id);

 useEffect(() => {

    dispatch(juegoPorId(id));

  }, [dispatch, id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return (
        <div className="game-detail-page">

      <h1 className="game-title">
        {juego.title}
      </h1>

      <div className="game-main-section">

        <div className="game-image-container">
          <img
            src={juego.imageUrl}
            alt={juego.title}
            className="game-image"
          />
        </div>

        <div className="game-info">

          <p className="game-description">
            {juego.description}
          </p>

          <div className="game-meta">
            <p>
              <strong>Genres:</strong>{" "}
              {juego.genres.join(", ")}
            </p>

            <p>
              <strong>Developer:</strong>{" "}
              {juego.developerName}
            </p>
          </div>

        </div>
      </div>

      <div className="game-action-card">

        <div className="game-action-info">
          <h2>{juego.title}</h2>
          <p>Descargalo ya!</p>
        </div>

        <button
          onClick={() => onAddToLibrary(game)}
          className="add-library-button"
        >
          Anadir a libreria
        </button>
      </div>
    </div>
    );
}

export default GameDetail;