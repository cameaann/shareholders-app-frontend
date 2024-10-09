# Osakkeenomistajien sovellus

## Johdanto

Osakkeenomistajatietojen hallinnasta tulee yhä monimutkaisempaa transaktioiden määrän kasvaessa, mikä voi johtaa mahdollisiin virheisiin. Keskeisiä kysymyksiä nousee esiin, kuten "Kuka omistaa yrityksen?" ja "Kuinka monta osaketta kukin omistaja hallitsee?"

Kun osakkeenomistajien transaktiot lisääntyvät, omistuksen ja osakkeiden tarkkojen tietojen ylläpito muuttuu vaikeammaksi. Virheet osakkeiden siirtojen, omistustietojen ja lakisääteisten velvoitteiden, kuten GDPR, seurannassa voivat aiheuttaa vakavia ongelmia.

## Sovelluksen tavoite:

Tämä osakkeenomistajien hallintajärjestelmä on avoimen lähdekoodin sovellus, joka on suunniteltu yksinkertaistamaan omistusoikeuksien ja osakeomistusten hallintaa. Järjestelmä on rakennettu tietoturva edellä, ja se varmistaa tietosuoja-asetusten noudattamisen (esim. GDPR) samalla kun se tarjoaa läpinäkyvyyttä yrityksen omistusoikeuksista ja osakejakautumasta.

## Keskeiset ominaisuudet:

- Seuraa tarkasti osakkeenomistajia ja heidän omistusosuuksiaan.
- Ylläpidä kattavia osakkeenomistajatietoja, kuten nimi, sosiaaliturvatunnus, osoite ja sähköposti.
- Varmista lainmukaisuus, siten että yrityksen hallitus pysyy vastuussa osakkeenomistajaluettelon ylläpidosta.
- Säilytä yksityiskohtainen historia osakekaupoista, mukaan lukien ostopäivät, myyjän ja ostajan tiedot, siirrettyjen osakkeiden määrä, hinta ja veroraportoinnin tila.
- Seuraa myytäviä osakkeita, seuraa osakenumerot ja lisää merkityksellisiä huomioita jokaisesta tapahtumasta.
- Tallenna osakeantopäätösten tiedot, kuten päätösnumerot, päivämäärät, enimmäis- ja liikkeelle lasketut osakkeet sekä muut olennaiset tiedot.
- Henkilötietojen turvallinen käsittely, varmistaen että sovellus täyttää GDPR
tietosuojavaatimukset.

## Käytetyt teknologiat:

- Java Springboot - [taustajärjestelmään](https://github.com/cameaann/shareholders-app-backend)
- Vite-kehitysympäristö
- React-kirjasto käyttöliittymän toteuttamiseen
- MUI JOY -kirjasto tietojen visualisointiin
- React-toastify -kirjasto

## Demo ja/tai live-sivun linkit
[Katso Shareholders App](https://cameaann.github.io/shareholders-app-frontend/)

## Tekijät ja vastuunjako

Projektin ovat toteuttaneet Aleksei Nikitin, Aleksandr Gainulin, Anna Shestakova ja Kristofer Aasa.

- Aleksei ja Aleksandr kehittivät sovelluksen taustajärjestelmän.
- Anna ja Kristofer vastasivat käyttöliittymästä.