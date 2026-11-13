# WAR ITALY — Cronologia versioni

## 4.0.0 — Campagna provinciale completa

- La mappa passa da 20 regioni a 110 province giocabili, con geometrie provinciali derivate dai confini ISTAT 2026.
- Ogni provincia possiede proprietario, reddito, bonus, presidio, fortificazioni, sviluppo e adiacenze proprie.
- Le province sono selezionabili direttamente sulla carta; gli ordini terrestri richiedono fronti contigui.
- Esercito e flotta hanno posizioni sulla mappa e possono muoversi tra province amiche raggiungibili; le vittorie spostano le unità sul territorio conquistato.
- I confini delle 20 regioni restano disponibili come livello cartografico separato.
- I salvataggi 3.x (12 o 20 regioni) vengono migrati alle 110 province per nome di regione, distribuendo i presidi e mantenendo i proprietari.
- Attribuzione: confini ISTAT 2026 redistribuiti con licenza CC BY 4.0 tramite guglielmo/geojson-italy.


## 3.7.0 — Campagna sulle 20 regioni italiane

- Carta ricostruita con i confini ufficiali delle 20 regioni ISTAT, al posto delle precedenti 12 suddivisioni schematiche.
- Campagna estesa a 20 regioni giocabili con proprietà, redditi, bonus, adiacenze, fronti, porti e movimenti collegati alla nuova geografia.
- Conservato il livello delle 110 province ISTAT come dettaglio cartografico.
- Salvataggi precedenti migrati per nome: le 12 vecchie regioni mantengono i propri dati e le 8 nuove regioni partono neutrali.


## 3.6.0 — Atlante provinciale ISTAT

- Integrato il livello cartografico dei confini amministrativi delle 110 province e città metropolitane italiane, derivato dai dati ISTAT 2026.
- Aggiunto il comando PROVINCE ISTAT per mostrare o nascondere il livello provinciale senza interferire con gli altri livelli.
- I confini sono semplificati per mantenere fluida la visualizzazione su smartphone e sono sovrapposti alla mappa strategica esistente.
- Attribuzione della fonte geografica: ISTAT, redistribuzione CC BY 4.0 tramite guglielmo/geojson-italy.


## 3.5.0 — Unità schierate e movimento operativo

- L'esercito nazionale ha ora una posizione sulla mappa e un marker selezionabile.
- È possibile spostare l'esercito tra territori amici contigui; le offensive terrestri e le annessioni neutrali richiedono la presenza dell'esercito sul fronte adiacente.
- Le flotte hanno una posizione cartografica, un marker dedicato e ordini di schieramento/spostamento tra porti amici collegati via mare.
- Le vittorie terrestri e navali spostano l'unità operativa nel territorio conquistato.
- Le posizioni di esercito e flotta sono incluse nei salvataggi; i vecchi salvataggi ricevono una posizione iniziale compatibile.


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
