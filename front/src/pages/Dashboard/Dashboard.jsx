import './_Dashboard.css';
import HeroWelcome from '../../components/Dashboard/HeroWelcome/HeroWelcome';

export default function Dashboard() {
 
  const userInfos = { firstName: 'Amine' }; 

  return (
    <div id="dashboard_wrapper">
      <div className="dashboard_header">
        <HeroWelcome firstName={userInfos.firstName} />
      </div>
    </div>
  );
}