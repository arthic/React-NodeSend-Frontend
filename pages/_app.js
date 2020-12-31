/* import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp */

/*Al ser _app es el componente de mayor jerarqui en Next.js,
desde aqui proveeomos el contexto a todos los componentes de la
aplicacion
*/
import React from 'react';
import AuthState from '../context/auth/authState';
import AppState from '../context/app/appState';

const MyApp = ({Component, pageProps}) => {
    return(
        <AuthState>
            <AppState>
                {/* A cualquier componente provee el AuthState*/}
                <Component {...pageProps}/>
            </AppState>
        </AuthState>
    )
}

export default MyApp
