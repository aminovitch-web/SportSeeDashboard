import './_HeroWelcome.css';

export default function Header({ firstName }) {
  return (
    <div className="heroWelcome">
      <h2>
        Bonjour <span className="firstname">{firstName}</span>
      </h2>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}