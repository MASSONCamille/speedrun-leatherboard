import { ThemeProvider } from "@material-ui/core";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import UrlMapping from "./components/UrlMapping/UrlMapping";
import AppSelector from "./rxjs/app.selector";
import appStore from "./rxjs/app.store";
import themes from "./themes/themes";
import { useLocation } from "react-router";

function App() {
    const { pathname } = useLocation();

    return (
        <ThemeProvider theme={themes.blue}>
            <>
                {/* {pathname.startsWith("/admin") || <Navbar />} */}
                <Navbar />
                <UrlMapping />
            </>
        </ThemeProvider>
    );
}

export default App;
