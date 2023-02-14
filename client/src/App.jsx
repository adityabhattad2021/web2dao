import { Route,Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./components";
import { Dashboard, Mint, Vote } from "./pages";


function App(){
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/mint" element={<Mint/>} />
                <Route path="/vote/:id" element={<Vote/>} />
            </Routes>
        </>
    )
}

export default App; 