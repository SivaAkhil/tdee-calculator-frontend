import "./card.css";

const Card = ({ number, name }) => {
  return (
    <div className="card-container">
      <h1 className="card-number">{number}</h1>
      <p className="card-name">{name}</p>
    </div>
  );
};

export default Card;
