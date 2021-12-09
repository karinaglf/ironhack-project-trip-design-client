// Deconstructing the props object directly in the parentheses of the function

function TripsCard({ tripName }) {
    return (
      <div className="card">
        <h3>{tripName}</h3>
      </div>
    );
  }
  
  export default TripsCard;