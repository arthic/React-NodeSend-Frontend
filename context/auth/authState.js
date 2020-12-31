// Acciones que disparan lo que tenemos en el reducer
import React, {useReducer} from 'react';
import authContex from './authContex'
import authReducer from './authReducer'
// Types
import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	LIMPIAR_ALERTA,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	USUARIO_AUTENTICADO,
	CERRAR_SESION
} from '../../types';
// Coneccion al Backend
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth'

// children = props
const AuthState = ({children}) => {

	// Definir state inicial
	const initialState = {
		/*Next.js se ejecuta en el cliente y en el servidor por lo tanto
		requerimos de una configuracion para usar el localStorage ya que
		solo existe del lado del cliente */
		token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
		autenticado: null,
		usuario: null,
		mensaje: null
	}

	// Definir el reducer
	const [state, dispatch] = useReducer(authReducer, initialState)

	// Registrar nuevos usuarios
	const registrarUsuario = async datos => {

		try {
			const respuesta = await clienteAxios.post('/api/usuarios', datos)
			dispatch({
				type: REGISTRO_EXITOSO,
				payload: respuesta.data.msg
			})

		} catch (error) {
			dispatch({
				type: REGISTRO_ERROR,
				payload: error.response.data.msg
			})
		}
		// Limpiar alerta despues de 3seg.
		setTimeout(() => {
			dispatch({
				type: LIMPIAR_ALERTA
			})
		}, 3000);
	}

	// Autenticar usuarios
	const iniciarSesion = async datos => {

		try {
			const respuesta = await clienteAxios.post('/api/auth', datos)
			dispatch({
				type: LOGIN_EXITOSO,
				payload: respuesta.data.token
			})
		} catch (error) {
			dispatch({
				type: LOGIN_ERROR,
				payload: error.response.data.msg
			})
		}
		// Limpiar alerta despues de 3seg.
		setTimeout(() => {
			dispatch({
				type: LIMPIAR_ALERTA
			})
		}, 3000);
	}

	// Retorne el usuario autenticado en base al JWT
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem('token')
		if(token) {
			tokenAuth(token)
		}

		try {
			const respuesta = await clienteAxios.get('api/auth')

			if(respuesta.data.usuario) {
				dispatch({
					type: USUARIO_AUTENTICADO,
					payload: respuesta.data.usuario
				})
			}
		} catch (error) {
			dispatch({
				type: LOGIN_ERROR,
				payload: error.response.data.msg
			})
		}
	}

	// Cerrar la sesion
	const cerrarSesion = () => {
		dispatch({
			type: CERRAR_SESION
		})
	}

	return (
		<authContex.Provider
		// Pasar el state
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				registrarUsuario,
				usuarioAutenticado,
				iniciarSesion,
				cerrarSesion
			}} // Varias llaves porque pasamos varios valores
		>
			{children}
		</authContex.Provider>
	)
}

export default AuthState