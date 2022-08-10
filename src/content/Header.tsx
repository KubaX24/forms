import {Link} from "solid-app-router";

function Header(){
    return(
        <header>
            <h1><span>F</span>orms.<span>CH</span>YTAC</h1>
            {/*<button onclick={(e) => redirect("create")}>Create new form</button>*/}
            <nav>
                <Link href={"/create"}>Create vote</Link>
            </nav>
        </header>
    )
}

// function redirect(url: String){
//     // @ts-ignore
//     window.history.pushState({},"", url);
//     console.log(url)
// }

export default Header