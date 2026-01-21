# Skolekantina

Et web-basert system for skolekantine med login-funksjonalitet og Firebase database-integrasjon.

## Funksjoner

- **Login-system** - Ansatte kan logge inn med epost og passord
- **Database-administrasjon** - INSERT, UPDATE og REMOVE operasjoner for varer
- **Produktvisning** - Viser alle kantineprodukter med pris
- **Responsive design** - Tilpasset alle skjermstørrelser

## Filer

- `index.html` - Hovedside med login-skjema
- `database.html` - Admin-side for databaseoperasjoner
- `index.js` - JavaScript-logikk for Firebase og skjemafunksjonalitet
- `style.css` - Stilark

## Installasjon

1. Last ned eller klon prosjektet
2. Åpne `index.html` i en nettleser
3. Logg inn med:
   - **E-post:** `simenhei@afk.no`
   - **Passord:** `admin`

## Firebase-setup

Prosjektet bruker Firebase Realtime Database. Konfigurasjonen er allerede satt opp i `index.js`.

## Bruk

### Login
Skriv inn epost og passord på forsiden og klikk "Logg inn" for å få tilgang til admin-siden.

### Database-operasjoner
- **INSERT:** Skriv inn varenavn, pris (valgfritt ID) og klikk "INSERT"
- **REMOVE:** Skriv inn ID og klikk "REMOVE"
- **UPDATE:** Skriv inn `id,nytnavn,nypris` og klikk (funksjon må implementeres)

## Lisens

Skolekantine © 2026