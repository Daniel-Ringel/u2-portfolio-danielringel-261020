# Daniel Ringel – Portfolio (u02)

A portfolio site built from Pawan's Figma design, made dynamic with JavaScript.

**Live site:** https://daniel-ringel.github.io/u2-portfolio-danielringel-261020/

**Jag siktar på VG.**

## Built with:
- HTML and CSS (Flexbox and Grid)
- JavaScript (ES2024+)
- JSON (my CV in `data/cv.json`)
- GitHub's REST API (my projects)
- Google Fonts (Poppins and DM Sans)

## Reflektion

### Datans väg

Min kod skickar en GET-förfrågan till GitHubs API med `?sort=pushed`, eftersom jag vill att de nyaste projekten ska visas först. GitHub svarar med en statuskod och en lista med mina repon i JSON-format. Först kollar jag `response.ok`. Om statuskoden inte är 200–299, till exempel 403 när gränsen på 60 anrop per timme är nådd, hoppar koden till `catch` och besökaren ser ett felmeddelande. Annars packar jag upp listan med `.json()` och tar bort forks med `filter`, eftersom en fork från början är någon annans projekt och inte går att göra privat. Sedan hämtar jag alla språk för varje projekt med `Promise.all`, så att alla anrop görs samtidigt istället för ett i taget. Till sist bygger `map(createProjectCard)` ett kort per projekt, och korten läggs in i min `<ul id="projects-list">` med `innerHTML`.

### Två datakällor

Mitt CV kommer från `cv.json`, en fil som jag har skrivit själv och som ligger på samma server som sidan. Projekten kommer från GitHubs API, som jag inte styr över. Därför litar jag mer på `cv.json`: jag vet exakt hur datan ser ut. Från GitHub vet jag inte alltid vad som kommer tillbaka. Till exempel saknade de flesta av mina repon en beskrivning, så `description` var `null`. GitHub har också en gräns på 60 anrop per timme. Min sida gör ett anrop för listan och ett per projekt för språken, så med fyra projekt räcker det till ungefär tolv laddningar. Efter det svarar GitHub med 403. Det syns i min kod: `cv.js` läser filen direkt utan kontroller, medan `project.js` kollar `response.ok`, använder `try`/`catch`, `??` och en timeout.

### DOM och händelser

Jag har tomma element i HTML:en, till exempel `<div id="work-list">` och `<ul id="projects-list">`. Jag valde att lägga dem i HTML:en istället för att skapa dem i JavaScript, eftersom HTML:en då bestämmer var innehållet hamnar och rubrikerna finns kvar även innan datan kommit. Jag hittar elementen med `querySelector`, och när datan har kommit fram, efter `await`, fyller jag dem med `innerHTML`.

Jag använder `addEventListener` för att reagera på `click` på temaknappen och menyknappen. Vid klick byter temaknappen klassen `dark`, uppdaterar sin `aria-label` och sparar valet. Menyknappen byter klassen `is-open` och uppdaterar `aria-expanded`, så att en skärmläsare vet om menyn är öppen. Jag lägger lyssnaren direkt på knappen eftersom det bara är den som ska reagera. Och eftersom det är riktiga `<button>`-element fungerar `click` även med Enter och mellanslag på tangentbordet.

### Markup du inte skrivit för hand

Jag lät JavaScript skriva samma element och klasser som jag skrev för hand i u01. Varje post i CV:t blir en `<article>` med en `<h3>`, och varje projekt blir ett `<li>` med en `<article>` i min `<ul>`. Därför fungerar min CSS direkt, och betydelsen följer med. På About ligger `<h2>` rubrikerna kvar i HTML:en, så ordningen går från `<h1>` till `<h2>` till `<h3>`. På Projects är varje projektnamn en `<h2>` under sidans `<h1>`. Länkarna är riktiga `<a>`. Platshållarbilderna har `alt=""` eftersom de bara är dekoration. Varje länk på projektkorten har dold text med projektets namn, så att en skärmläsare vet vilket projekt länken gäller. Jag kontrollerade det i fliken Accessibility i DevTools och med Lighthouse.

### Temaväxlingen

När användaren trycker på knappen med lampikonen byts färgerna mellan `:root` och `:root.dark`. JavaScript ändrar inga färger själv, utan lägger bara till eller tar bort klassen `dark` på `<html>` med `classList.toggle`. Jag valde en klass eftersom alla färger då ligger på ett ställe i CSS, och JavaScript bara har ett enda jobb: att byta klassen. Jag sparar valet i `localStorage` eftersom sidan annars hade glömt valet varje gång besökaren bytte sida. Om färgerna hade legat i JavaScript hade jag behövt ändra varje element för sig. Det märkte jag när jag fixade kontrasten för WCAG: jag ändrade bara elva färgvärden i `:root` och `:root.dark`, utan en enda rad JavaScript.

### När det inte går som tänkt

Medan projekten laddas ser besökaren en spinner och prickar som rör sig. Om GitHub svarar långsamt avbryter `AbortSignal.timeout` anropet efter åtta sekunder, och besökaren får veta att GitHub tar för lång tid. Om svaret inte är ok, till exempel 403 när gränsen är nådd, eller om nätet är borta, hamnar koden i `catch` och sidan visar "Couldn't load projects right now". Om listan är tom visar jag "No projects to show yet" och avbryter med `return`. I alla tre fallen finns en länk till mitt GitHub, så att besökaren alltid har en väg vidare. Jag testade det på riktigt när jag själv nådde gränsen på 60 anrop och sidan visade felmeddelandet istället för att ladda för evigt.

### Styrkor och brister

Jag är nöjd med felhanteringen i `project.js`, eftersom sidan aldrig går sönder: besökaren ser alltid något begripligt, oavsett om GitHub är långsamt, svarar med fel eller skickar en tom lista.

Med mer tid skulle jag bygga om hur `project.js` använder GitHubs API, eftersom gränsen på 60 anrop per timme är lätt att nå. Jag skulle spara svaret i `sessionStorage`, så att en omladdning inte gör nya anrop. Jag skulle också flytta lampknappen längst till höger på desktop utan att ändra mobilvyn. Det skulle jag göra med två knappar, en med `mobile-only` och en med `desktop-only`, så att bara en syns åt gången och tangentbordsordningen följer det man ser. I JavaScript skulle jag då använda `querySelectorAll` och `forEach`.

### AI-verktyg

Jag använde AI som en lärare. Den gav mig oftast inte färdig kod att kopiera, utan förklarade nya saker och gav mig kod med luckor som jag fyllde i själv, till exempel i `menu.js`. Sedan testade jag allt i webbläsaren. Jag litade inte blint på koden. När projekten hade laddat låg texten "Loading projects" kvar, trots att koden satte `hidden`. Jag märkte det när jag testade, och felet var att min CSS med `display: flex` vann över `hidden`, så jag lade till regeln `#projects-status[hidden]`.

## Tillgänglighet och testning

Jag testade varje sida med enbart tangentbordet. Jag tabbade genom hela sidan och kollade att fokus syntes och att ordningen var logisk. Jag körde Lighthouse på alla sidor, i både ljust och mörkt läge, och fick 90 till 100 i Accessibility. Lighthouse kan inte mäta kontrast på gradienttext, så jag använde AI för att räkna ut kontrasten för varje gradientfärg separat. Sedan dubbelkollade jag själv att färgerna klarade WCAG AA, och ändrade elva färger som inte gjorde det. Logon är undantagen enligt WCAG 1.4.3. I fliken Accessibility i DevTools kontrollerade jag att länkarna på projektkorten läses upp med projektets namn. Alla sidor har 0 fel i W3C:s validator.

