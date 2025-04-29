import NavBar from "./NavBar"
import Footer from "./Footer"

/**
 * Represents the default structure of a page in this application
 * @param {*} children the content of the component to display
 * @returns the content surrounded by a NavBar and a Footer
 */

export default function Layout({ children }) {
    return <>
        <NavBar/>
        { children }
        <Footer/>
    </>
}