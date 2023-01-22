import { Typography } from '@mui/material';
import React from 'react';

import './Contact.scss';


function Contact() {

  return (
    <div className="Contact">
      <header className="Contact-header">
        <Typography variant="h3" component="h3">
            Contact
        </Typography>
      </header>

      <body>
        <div className="content">
          <div className="text">
            <div className='program_lucru'>
              <Typography variant="h5" component="h5">
                Program de lucru:<br/><br/>

                    &emsp; Luni - Vineri: 09:30 - 17:30<br/>
                    &emsp; Sambata - Duminica: Inchis<br/>
              </Typography>
            </div>
            <div className="detalii">
              <Typography variant="h5" component="h5">
                Telefon: 021.555.92.70<br/><br/>

                Pentru suport si sugestii:<br/>
                    &emsp;service@forit.ro<br/><br/>

                Service: 0771074389<br/><br/>

                <a href="https://www.google.com/maps/place/ForIT/@44.4333605,26.1553322,15.5z/data=!4m5!3m4!1s0x0:0xdcb9e39e7453f875!8m2!3d44.433365!4d26.1553071" target="_blank" rel="noopener" style={{textDecoration: "none", color: 'white'}}>
                  Punct de lucru (ridicare comenzi)
                </a><br/><br/>
                    &emsp; Bulevardul Basarabia, nr. 104, Bucuresti, Sector 2, 022123
              </Typography>
            </div>
          </div>

          <iframe className="harta" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8058.16153651261!2d26.15533223921822!3d44.433360512224986!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdcb9e39e7453f875!2sForIT!5e0!3m2!1sro!2sro!4v1572604481770!5m2!1sro!2sro"></iframe>
        </div>
      </body>
    </div>
  );
}

export default Contact;