# WAR ITALY — Cronologia versioni

## 2.9.0 — Backup portatili e protezione dei salvataggi

- Aggiunta l'esportazione della campagna in un file JSON.
- Aggiunta l'importazione di un backup nello slot selezionato.
- I backup importati vengono validati prima del caricamento: fazione, turno, risorse e struttura delle dodici regioni.
- I vecchi salvataggi senza impostazione di difficoltà vengono caricati in modalità Standard.
- Aggiunti test automatici per importazione, esportazione e validazione dei backup.

## 2.8.0 — Difficoltà e intelligenza delle fazioni

- Aggiunti tre livelli di difficoltà selezionabili prima della campagna: Facile, Standard e Difficile.
- Le risorse iniziali e il consenso cambiano in base alla difficoltà.
- Le fazioni rivali ricevono presidi e forza offensiva coerenti con il livello scelto.
- La difficoltà viene salvata e ripristinata quando si carica una partita.

## 2.7.0 — Stabilità e affidabilità

- Eliminata la doppia esecuzione del comando Fine turno.
- Unificato l'avvio della campagna per inizializzare correttamente le fazioni rivali una sola volta.
- Inizializzato lo stato di tutte e sei le tecnologie anche prima della prima partita.
- Aggiunta una suite di test automatici e integrati i controlli in GitHub Actions.

## 2.6.0 — Interfaccia e campagna

- Restyling dell'interfaccia tattica e ottimizzazione mobile.
- Menu di comando compatto in cinque categorie.
- Campagna con quattro fazioni e dodici regioni.
- Sistemi di economia, diplomazia, ricerca, intelligence e combattimento.
