## Proiect pentru cursul de Front-End Avansat

### Link catre demo-ul proiectului: https://youtu.be/RFYJBeoktto

### &emsp; In cadrul acestui proiect, am ales sa fac un site web, in care sa vand piese pentru PC, din mai multe categorii. Drept inspiratie, am folosit platforma celor de la www.forit.ro (folosind sigla, datele de contact si o parte din descriere). Produsele sunt impartite in 7 categorii (carcase, procesoare, placi video, placi de baza, surse, memorii RAM, SSD-uri). Fiecare categorie de produse are cate o pagina dedicata, unde user-ul poate filtra produsele in functie de anumite criterii precum: producator, tip memorie, soclu procesor, capacitate memorie etc. De asemenea, produsele pot fi sortate in functie de pret (crescator/descrescator). Un user poate comanda produse cu ridicare din magazin (detalii in pagina de contact), fie ca este logat pe platforma sau nu (daca nu este logat, nu poate vedea istoricul comenzilor plasate si trebuie sa furnizeze si numele complet).

#### Rutele folosite in cadrul proiectului sunt:
  - "/" ruta default, folosita pentru pagina de Home  (componenta Home)
  - "/products" ruta pentru pagina ce contine categoriile de produse, mentionate anterior (componenta Products)
  - "/shoppingcart" ruta pentru cosul de cumparaturi  (componenta ShoppingCart)
  - "/contact" pagina ce contine datele de contact ale magazinului  (componenta Contact)
  - "/cpu" pagina ce contine produsele din categoria Procesoare  (componenta CPU)
  - "/gpu" pagina ce contine produsele din categoria Placi video (componenta GPU)
  - "/psu" pagina ce contine produsele din categoria Surse (componenta PSU)
  - "/ram" pagina ce contine produsele din categoria Memorii RAM (componenta RAM)
  - "/placi_baza" pagina ce contine produsele din categoria Placi de baza  (componenta MBD)
  - "/ssd" pagina ce contine produsele din categoria SSD-uri (componenta SSD)
  - "/carcase" pagina ce contine produsele din categoria Carcase (componenta Case)
  - "*" daca userul incearca sa acceseze o ruta care nu exista, el este redirectionat automat catre ruta default ("/", pagina Home)
  
#### Componentele reutilizabile folosite sunt:
  - CaseItem - primeste ca prop datele despre un obiect din categoria Carcase (interfata ICase)
  - CPUItem - primeste ca prop datele despre un obiect din categoria Procesoare  (interfata ICPU)
  - GPUItem - primeste ca prop datele despre un obiect din categoria Placi video (interfata IGPU)
  - MBDItem - primeste ca prop datele despre un obiect din categoria Placi de baza (interfata IMBD)
  - PSUItem - primeste ca prop datele despre un obiect din categoria Surse (interfata IPSU)
  - RAMItem - primeste ca prop datele despre un obiect din categoria Memorii RAM (interfata IRAM)
  - SSDItem - primeste ca prop datele despre un obiect din categoria SSD-uri (interfata ISSD)
    ##### Acestea au rolul de a afisa detalii despre un produs, precum: poza, cateva specificatii, pretul si posibilitatea de a-l adauga in cosul de cumparaturi.
  - ProfileOrderItem - primeste ca prop detalii despre o comanda plasata anterior de catre un user si are rolul de a afisa aceste detalii pe pagina de profil a user-ului la sectiunea "Comenzi plasate"
  - ShoppingCartItem - primeste ca prop detalii despre un produs din cos si are rolul de a afisa aceste detalii pe pagina cu cosul de cumparaturi

#### &emsp; Componentele comunica intre ele folosind props. De exemplu pagina "Case" comunica cu "CaseItem", folosind un prop cu detalii despre un obiect din categoria de Carcase; pagina de Profil a user-ului (daca e autentificat) foloseste ca prop detalii despre user; o alta pagina care foloseste ca prop detalii despre user este pagina pentru cosul de cumparaturi (pentru a putea determina daca acesta trebuie sa furnizeze numele si prenumele in momentul in care plaseaza comanda).

#### Rute publice si private:
##### &emsp; Rutele mentionate mai sus sunt publice. Pe langa acestea, aplicatia are si rute private:
&emsp; &emsp; - "/auth" ruta ce contine optiunile de logare, inregistrare pe platforma sau resetare parola (componenta Auth, ce contine componentele Login, Register si  Reset); un link catre aceasta ruta apare in NavBar cand user-ul nu este autentificat, iar daca un user autentificat incearca sa acceseze ruta, acesta este redirectionat catre pagina Home <br/>
&emsp; &emsp; - "/profile" ruta pentru pagina de profil a user-ului logat, ce contine date despre user (nume, prenume, email, numar telefon, detalii comenzi facute); un link catre aceasta ruta apare in NavBar cand user-ul este autentificat (in locul lui Auth), iar daca un user neautentificat incearca sa acceseze ruta, acesta este redirectionat catre pagina Home <br/>

#### &emsp; Aplicatia web contine o pagina cu form (Auth, care are cele 3 optiuni: logare (componenta Login), inregistrare (componenta Register) si resetare parola (componenta Reset)). De asemenea in pagina de profil a user-ului, acesta isi poate edita datele referitoare la nume, prenume sau numarul de telefon.

#### &emsp; Pentru partea de backend am folosit Firebase (Firestore Database), iar pentru functionalitatea de autentificare am folosit Firebase Authentication.

#### &emsp; In cadrul proiectului am folosit si un state manager: React Redux. Configuratia acestuia se afla in folder-ul "store"; l-am folosit pentru a prelua din baza de date detalii despre produse (de la un simplu GET, pana la filtrare in functie de anumite field-uri), pentru plasarea unei comenzi, dar si pentru anumite functionalitati ce tin de cosul de cumparaturi, precum: stergere produs, incrementare/decrementare numar pentru un anumit produs din cos sau golire cos.
