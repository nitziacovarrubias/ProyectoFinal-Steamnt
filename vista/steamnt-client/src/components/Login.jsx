import { Link } from 'react-router-dom'

function Login() {
    return (
        <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
    );
}

export default Login;
