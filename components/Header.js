import React, {useEffect, useContext} from 'react';
import Link from 'next/link'
import {useRouter} from 'next/router'
import authContext from '../context/auth/authContex';
import appContext from '../context/app/appContext';

const Header = () => {

	// Routing
	const router = useRouter()

	// Extraer el Usuario autenticado del Storage
	const AuthContext = useContext(authContext)
	const {usuarioAutenticado, usuario, cerrarSesion} = AuthContext

	// Refrescar el componente al hacer la descarga
	const AppContext = useContext(appContext)
	const {limpiarState} = AppContext

	// Solomente una vez verifica si hay un usuario autenticado
	useEffect(() => {
		usuarioAutenticado()
	}, [])

	// Routing
	const redireccionar = () => {
		router.push('/')
		limpiarState()
	}

	return (
		<header className="py-8 flex flex-col md:flex-row items-center justify-between">
			<img
				onClick={() => redireccionar()}
				className="w-64 mb-8 md:mb-0 cursor-pointer"
				src="/logo.svg"
			/>

			<div>
				{
					usuario ? (
						<div
							className="flex items-center"
						>
							<p
								className="mr-2"
							>Hola {usuario.nombre}</p>
							<button
								className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
								type="button"
								onClick={() => cerrarSesion()}
							>
								Cerrar Sesión
							</button>
						</div>
					) : (
						<>
							<Link href="/login">
								<a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar Sesion</a>
							</Link>
							<Link href="/crearcuenta">
								<a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear Cuenta</a>
							</Link>
						</>
					)
				}
			</div>
		</header>
	);
}

export default Header;