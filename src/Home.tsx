import { Typography } from '@mui/material';

import './Home.scss';


function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <Typography variant="h3" component="h3">
          Despre noi
        </Typography>
      </header>

      <div>
        <div className='content_home'>
          <div>
            <Typography variant="h5" component="h5">
              Avem la dispozitie Componente PC din 7 categorii:<br/>
              &emsp; - procesoare<br/>
              &emsp; - placi video<br/>
              &emsp; - surse<br/>
              &emsp; - memorii RAM<br/>
              &emsp; - placi de baza<br/>
              &emsp; - SSD-uri<br/>
              &emsp; - carcase<br/><br/>
              Acestea pot sa fie:<br/>
              &emsp; - filtrate in functie de specificatii<br/>
              &emsp; - sortate in functie de pret<br/><br/>
              Produsele sunt de calitate si la preturi mici.<br/><br/>
              Forit.ro - un magazin online actual, practic, complet.<br/>
              Navigare placuta si cumparaturi reusite!
            </Typography> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;