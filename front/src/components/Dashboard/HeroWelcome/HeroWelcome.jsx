// Import styles for the component
import './_HeroWelcome.css';

// HeroWelcome component definition
export default function Header({ firstName }) {
  return (
    // Main container for the welcome message
    <div className="heroWelcome">
      {/* Greeting header */}
      <h2>
        Bonjour <span className="firstname">{firstName}</span>
      </h2>
      {/* Congratulatory message */}
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}