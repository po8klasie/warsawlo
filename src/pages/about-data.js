import React from 'react'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import SEO from 'components/SEO'
import dataImage from 'images/data.jpg'
import Article from 'components/Article'
import Header from 'components/Header'
import TextLink from 'components/TextLink'
const ArticleWrapper = styled('div')`
margin-top:5vh;
`
export default props => {
  return (
    <Layout>
    <SEO title="O naszych danych" />
    <Header bg={dataImage} title="O naszych danych" />
    <ArticleWrapper>
    <Article>
    <p>
    Hej, pewnie zastanawiasz się skąd zebraliśmy te wszystkie dane?
    Poniżej przedtawiamy nasze źródła.
    </p>
    <h3>Miasto Stołeczne Warszawa</h3>
    <p>
    Informacje dotyczące nazw szkół, ich danych kontaktowych oraz lokalizacji pobraliśmy
    z serwisu "Otwarte dane po warszawsku" <TextLink wrapper="a" href="http://api.um.warszawa.pl">(api.um.warszawa.pl)</TextLink> w dniu 8.02.2019 r.
    Dane prezentowane w serwisie mogą różnić się od danych zamieszczonych na stronie!
    </p>
    <h3>Serwis Biura Edukacji m.st. Warszawy</h3>
    <p>
    Dane związane z profilami szkół, średnimi ilościami punktów oraz datami dni otwartych
    zaczerpneliśmy z dokumentów pdf z Serwisu Biura Edukacji m.st. Warszawy <TextLink wrapper="a" href="http://edukacja.warszawa.pl">(edukacja.warszawa.pl)</TextLink>, które przetworzyliśmy do przyjaznego formatu.
    </p>
    <h3>HERE Maps API</h3>
    <p>
    Lokalizacja szkół udostępniona przez Miasto Stołeczne Warszawa zawiera tylko dane adresowe
    Z pomocą Here Maps API <TextLink wrapper="a" href="http://developer.here.com">(developer.here.com)</TextLink> poddaliśmy je procesowi geolokalizacji, czyli mówiąc prościej,
    pobraliśmy współrzędne geograficzne odpowiadające adresom, dzięki czemu możemy prezentować mapy oraz wskazówki dojazdu.
    </p>
    <h3>Społeczność</h3>
    <p>
    Przecież to serwis tworzony przez uczniów dla uczniów, więc największym źródłem informacji jesteśmy my!
    Wszelkie błędy zostają poprawione "manualnie" po werfikacji, w związku z tym dane w naszym serwisie mogą się różnić od danych pobranych za pomocą API.
    </p>

    </Article>
    </ArticleWrapper>
    </Layout>
  )
}
