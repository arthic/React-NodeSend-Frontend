import React, {useContext} from 'react';
import authContex from '../context/auth/authContex'
import appContext from '../context/app/appContext'

const Alerta = () => {

	// Extraer mensaje de error para usuarios
	const AuthContext = useContext(authContex)
	const {mensaje} = AuthContext

	// Extraer el msg error de archivo
	const AppContext = useContext(appContext)
	const {mensaje_archivo} = AppContext

	return (
		<div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto">
			{mensaje || mensaje_archivo}
		</div>

	);
}

export default Alerta;