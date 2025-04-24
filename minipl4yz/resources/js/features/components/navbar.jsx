import { useEffect, useState } from "react";

const NavBar=()=>{
    const [title, setTitle] = useState('MiniPl4yz');
    const [check,setCheck]=useState(false)
    useEffect(()=>{
        const CheckLogin= async ()=>{
            const response = await fetch('/api/checklogin');
            const res = await response.json();
            console.log(res.Auth)
            setCheck(res.Auth)
        }
        CheckLogin()
    },
    []
    )

    return (
    <div className="bg-prpl m-0">
        <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand col-1 ps-4 ps-md-5 mx-auto" href="/">
            <img id='favicon' src="favicon.png" alt=""/>
        </a>
        <div className="d-none d-lg-block offset-2">
            <h1 className="Titulo"
                onMouseEnter={() => setTitle('Juega Ya!!')} 
                onMouseLeave={() => setTitle('MiniPl4yz')}
            >
                {title}
            </h1>
        </div>
        <button className="navbar-toggler me-4" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col col-md-5 pe-4 text-center" id="navbarSupportedContent">
            <form className="form-inline col-5 text-center mx-auto my-2 my-lg-0 d-flex" action="/catalog/search">
                <input className="form-control me-sm-2" type="search" name="search" placeholder="Search" autoComplete="off"/>
                <button className="btn my-2 my-sm-0 fs-3 p-0" type="submit">🔍</button>
            </form>
            {check?
            <ul className="navbar-nav mx-auto col-4">
                <li className="nav-item active">
                    <a className="nav-link fs-5" href="/">Inicio</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle fs-5" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Perfil
                    </a>
                    <div className="dropdown-menu col-7 text-center mx-auto" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/stats">Estadisticas de Juego</a>
                        <a className="dropdown-item" href="/catalog/fav">Juegos Favoritos</a>
                        <a className="dropdown-item" href="/my-profile">Mi perfil</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/logout">Salir</a>
                    </div>
                </li>
            </ul>
            :
            <div className="row col-5">
                <div className="col p-md-0 pe-md-1 text-center">
                    <a id="loginForm" className="nav-link">Iniciar Sesion</a>
                </div>
                <div className="col p-md-0 ps-md-1">
                    <a id="registerForm" className="nav-link">Registrarse</a>
                </div>
            </div>
            }{/* Fin del CheckLog */}
        </div>
    </nav>        
    </div>
)
}

export default NavBar