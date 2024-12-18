const tabella = document.getElementById("tabella"); 
const navbar = document.getElementById("navbar");
const formElement = document.getElementById("form");

import { tableComponent } from './componenti/tabella.js';
import { NavBarComponent } from './componenti/navbar.js';
import { createForm } from './componenti/form.js';
import { generateFetchComponent } from './componenti/fetch_componenti.js';
import { createMap } from './componenti/mappa.js';
import { checkLogin } from './componenti/checkLogin.js';

fetch("conf.json")
    .then((r) => r.json())
    .then((conf) => {
        // Crea componente tabella
        const table1 = tableComponent();
        table1.setParentElement(tabella);

        const navBarComp = NavBarComponent(conf);
        const compFetch = generateFetchComponent();
        
        const Map = createMap();

        //fa render mappa
        Map.render();

        // Crea componente form e passa mappa e tabella anche
        const form = createForm(formElement, Map, table1);

        console.log('Oggetto Map:', Map);
        console.log('Oggetto form:', form);

        // Carica i dati di configurazione
        compFetch.caricaDati(conf);
        // Configura e renderizza la form
        form.render(table1, compFetch, Map);

        // Recupera i dati e popola i componenti
        compFetch.getData().then((data) => {
            //la fa generare
            form.setLabels(data);
            table1.setData(data); 
            table1.render(); 
            Map.add(data); 
        });

        // Configura e renderizza la barra di navigazione
        navBarComp.setParentElement(navbar);
        navBarComp.render(form, table1);
    });
    //Controlla se è loggato con la funzione checkLogin
    if (checkLogin()) {
      //Se è loggato nasconde il pulsante login e fa vedere il pulsante aggiungi incidente
        document.getElementById('bottoneAggiungi').style.display = 'flex'; 
        document.getElementById('bottoneLogin').style.display  = "none";
      }else{
        //Se non è loggato fa vedere il pulsante login e nasconde il pulsante aggiungi incidente
        document.getElementById('bottoneAggiungi').style.display  = "none"; 
        document.getElementById('bottoneLogin').style.display = 'flex';  
      }

