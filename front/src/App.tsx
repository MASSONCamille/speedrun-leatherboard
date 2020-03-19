import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import UrlMapping from "./components/UrlMapping/UrlMapping";
import themes from "./themes/themes";

function App() {
    return (
        <Router>
            <ThemeProvider theme={themes.blue}>
                <>
                    <CssBaseline />
                    <Navbar />
                    <UrlMapping />
                </>
            </ThemeProvider>
        </Router>
    );
}

export default App;
