# WAR ITALY — Cronologia versioni

## 3.4.0 — Fronti contigui e selezione cartografica

- I 12 territori strategici sono ora selezionabili anche toccando direttamente i rispettivi poligoni sulla mappa, oltre ai pulsanti territoriali.
- Il territorio selezionato viene evidenziato sulla carta e supporta la navigazione da tastiera.
- Aggiunta una rete esplicita di adiacenza territoriale e visualizzazione dei collegamenti nel rapporto regionale.
- L'espansione su territori neutrali e le offensive terrestri richiedono ora un fronte contiguo; anche l'IA sceglie espansioni e bersagli coerenti con i propri confini.
- Corrette sequenze di escape CSS che impedivano ad alcune regole della mappa di essere interpretate correttamente.
- La mappa mantiene 12 macro-territori: la suddivisione in province amministrative più numerose resta una fase successiva.


## 3.3.0 — Confini territoriali ad alta densità

- Aggiunto un livello cartografico di dettaglio con suddivisioni territoriali interne per dare alla mappa una lettura più vicina a un atlante da campagna strategica.
- Introdotto il comando DETTAGLIO TERRITORI, indipendente dagli altri livelli cartografici.
- Le suddivisioni sono una prima rappresentazione stilizzata: non vengono ancora trattate come province giocabili né modificano le regole della campagna.
- Conservati i dodici territori giocabili esistenti per evitare incompatibilità con i salvataggi e con la logica economica/diplomatica.


## 3.2.0 — Città e porti del teatro operativo

- Aggiunti 12 riferimenti urbani distinti ed eliminata la duplicazione del marker di Milano.
- Aggiunti 8 marker portuali con simboli nautici e tooltip: Genova, Venezia, Trieste, Civitavecchia, Napoli, Bari, Palermo e Cagliari.
- Introdotto il livello indipendente INSEDIAMENTI per mostrare o nascondere città e porti senza alterare terreno e confini.
- Migliorata la leggibilità dei nomi urbani.

## 3.1.0 — Atlante strategico multilivello

- Introdotto un livello cartografico indipendente per gestire mappa e segnalini territoriali come un unico teatro operativo.
- Aggiunti controlli di zoom progressivo fino al 260%, trascinamento della mappa e comando di ricentratura.
- Aggiunti livelli attivabili separatamente per terreno, confini e città.
- Arricchiti i dettagli topografici con rilievi montuosi, curve di livello stilizzate e direttrici stradali.
- Aumentata la densità dei riferimenti urbani: Aosta, Torino, Milano, Trento, Trieste, Bologna, Firenze, Roma, Napoli, Bari, Palermo e Cagliari.
- Conservata l'integrazione con le dodici regioni e il controllo dinamico delle fazioni.


## 3.0.1 — Ripristino della mappa strategica italiana

- Ripristinata la mappa geografica della penisola italiana, con Sardegna e Sicilia.
- Aggiunti dodici territori regionali visualizzati direttamente sulla carta.
- Colori territoriali dinamici per regioni controllate, neutrali e contese.
- Inseriti riferimenti geografici, città principali, rotte e dettagli topografici in stile mappa strategica classica.
- Le dodici regioni restano selezionabili e collegate ai rapporti territoriali e alle azioni di campagna.
- Aggiunti controlli automatici per verificare presenza, province e aggiornamento dei colori della mappa.

## 3.0.0 — Edizione strategica completa

- Interfaccia tattica rinnovata e menu mobile compatto in cinque categorie.
- Campagna Italia 2035 con quattro fazioni, dodici regioni e quindici missioni.
- Economia regionale, sviluppo territoriale, produzione, rotte commerciali e gestione del consenso.
- Combattimento terrestre, aereo e navale con scelta della dottrina tattica.
- Diplomazia, trattati, intelligence, controspionaggio ed eventi strategici.
- Sei tecnologie e progressione della campagna fino all'unificazione nazionale.
- Tre livelli di difficoltà con intelligenza rivale bilanciata.
- Tre slot manuali, salvataggio automatico e backup JSON esportabili/importabili con validazione.
- Corretto il doppio avanzamento del turno e unificato l'avvio della campagna.
- Suite di test automatici e build Android serializzata in GitHub Actions.

## 2.9.0 — Backup portatili e protezione dei salvataggi

- Aggiunta l'esportazione della campagna in un file JSON.
- Aggiunta l'importazione di un backup nello slot selezionato.
- I backup importati vengono validati prima del caricamento.
- Aggiunti test automatici per importazione, esportazione e validazione.

## 2.8.0 — Difficoltà e intelligenza delle fazioni

- Aggiunti tre livelli di difficoltà selezionabili prima della campagna.
- Risorse iniziali e fazioni rivali bilanciate in base alla difficoltà.
- Difficoltà salvata e ripristinata con la partita.

## 2.7.0 — Stabilità e affidabilità

- Eliminata la doppia esecuzione del comando Fine turno.
- Unificato l'avvio della campagna.
- Inizializzate tutte le sei tecnologie.
- Aggiunti test automatici e controlli in GitHub Actions.

## 2.6.0 — Interfaccia e campagna

- Restyling dell'interfaccia tattica e ottimizzazione mobile.
- Menu di comando compatto in cinque categorie.
