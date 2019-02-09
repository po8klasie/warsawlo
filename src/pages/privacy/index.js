import React from 'react'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import TextLink from 'components/TextLink'
import privacyImage from 'images/privacy.jpg'
import Article from 'components/Article'
import Header from 'components/Header'
import SEO from 'components/SEO'
const ArticleWrapper = styled('div')`
margin-top:5vh;
`
export default props => {
  return (
    <Layout>
    <SEO title="Polityka prywatności" />
    <Header bg={privacyImage} title="Polityka prywatności" />
    <ArticleWrapper>
    <Article>
    <p>
    Wierzymy, że wszystko może być proste i przejrzyste, dlatego zbieramy <b>TYLKO</b> dane,
    które zwyczjnie ułatwią Ci życie. Nic innego. Żadnych cookies od Google Analytics itp.
    </p>
    <h3>Jakie dane od Ciebie pozyskujemy?</h3>
    <ol>
    <li>Ilość punktów, którą obliczyłeś za pomocą naszego kalkulatora punktów (tylko wtedy, gdy wyrazisz na to zgodę)</li>
    <li>Listę obserwowanych szkół</li>
    </ol>
    <p>
    Ponadto na twoim urządzeniu przechowywane są dane dostawcy usług map Mapbox.
    </p>
    <h3>Gdzie są przechowywane te dane?</h3>
    <p>
    Te dane są przechowywane tylko na twoim urządzeniu za pomocą technologii WebStorage oraz IndexedDB,
    o których możnaby powiedzieć, że są czymś w rodzaju nowocześniejszych plików cookies.
    Pamiętaj, nigdzie nie wysyłamy twoich danych!
    </p>
    <p>
    <i>Jeśli chcesz poczytać więcej na temat WebStorage i IndexedDB polecam strony:<br />
    <TextLink wrapper="a" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API</TextLink>
    <br/>
    <TextLink wrapper="a" href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API</TextLink>
    </i>
    </p>
    <h3>Jak mogę usunąć te dane?</h3>
    <p>
    Wejdź na <TextLink to="/privacy-settings">naszą stronę ustawień prywatności</TextLink> i kliknij "Wyczyść wszystkie dane"
    </p>

    </Article>
    </ArticleWrapper>
    </Layout>
  )
}
