# Aufgabenergebnis

## Eingesetzte Technologien / Frameworks

Folgende Technolgien / Frameworks setze ich in meinem Projekt ein:

- HTML / CSS
- Vue.js

Ich schrecke normalerweise nicht davor zurück, Websites in "reinem" HTML und CSS ohne Frameworks zu erstellen, weil ich
darin viel Erfahrung habe, das Ergebnis leichtgewichter ist, und weniger Overhead und Tools bei der Entwicklung nötig
sind.

Weil es hier um eine Web-App geht, die viel Interaktivität erfordert und aus mehreren Teilen besteht, die miteinander
kommunizieren, macht es heir Sinn, ein JavaScript-Framework einzusetzen. Ich habe mich für Vue.js entschieden, weil ich
mit Vue und Angular bereits kleinere Projekte umgesetzt habe und Vue moderner und weniger umständlich finde. Ich habe
die CLI-Version von Vue eingesetzt, um für jede Komponente eine separate Datei anlegen und IDE-Features nutzen zu
können.

Wäre die App sehr simpel gewesen (reines Zeichnen auf Canvas ohne UI für Tools und Palette), hätte ich wahrscheinlich
kein Framework verwendet.

Meine letzte Begegnung mit Vue ist allerdings schon zwei Jahre her, daher habe ich für dieses Projekt erst wieder etwas
ins Thema hineinfinden müssen. Hätte ich im Moment mehr Zeit, hätte ich gerne noch die Kommunikation zwischen
Komponenten verbessert, einige Dinge in separate Klassen ausgelagert (Farben, Tools, Paint-Bucket-Algorithmus etc.) und
das CSS wartbarer gemacht.

## Eingesetzte 3rd Party Libraries

Außer Vue.js war in diesem Projekt keine 3rd-Party-Libraries oder Frameworks nötig, da der Umfang der App nicht allzu
groß ist und die meisten Aufgaben (Speichern, Paint Bucket etc.) auch mit ein paar Zeilen reinem JavaScript umgesetzt
werden können. Ich hatte die Library p5.js für das Zeichnen auf dem Canvas in Erwägung gezogen, da aber im Prinzip nur
Rechtecke gemalt werden müssen, war das in diesem all nicht nötig.

Wenn die App erweitert werden müsste, könnte man für die UI ein CSS-Framework in Erwägung ziehen (z.B. Bulma, für das es
auch eine Vue-Anbindung gibt.)

## Installation / Ausführen des Projektes

Die App ist zur schnellen Ansicht auf [misc.eric-kaiser.net/pixel-editor](https://misc.eric-kaiser.net/pixel-editor)
gehostet.

Um das Projekt lokal auszuführen, vorgehen wie in README.md beschrieben:

- [nodejs](https://nodejs.org/en/) v16.14.0 installieren
- Nach dem Klonen des Repos:
    ```
    npm install
    npm run serve
    ```

Die App sollte sich dann unter `localhost:8080` öffnen lassen.
