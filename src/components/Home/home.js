import {Link} from "react-router-dom";

export default function Home() {
    return (
        <header>
            <Link to={'three'}><h1>Three</h1></Link>
            <Link to={'mathbox'}><h1>Mathbox</h1></Link>
        </header>
    );
}