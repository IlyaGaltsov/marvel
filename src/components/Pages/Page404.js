import ErrorMessage from "../errorMessage/ErrorMessage";
import {link} from "react-router-dom"

const Page404=()=>{
    return(
        <div>
            <ErrorMessage/>
            <p style={{'font-size': '22px'}}>Page Doesnt Exit</p>
            <link to="/">Back to MainPage</link>
        </div>
    )
}
export default Page404;