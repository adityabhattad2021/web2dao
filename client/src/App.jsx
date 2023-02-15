import { Route,Routes } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./components";
import { Dashboard, Mint, Propose, Vote } from "./pages";


function App(){
    return(
        <div className="relative flex flex-col h-full">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/mint" element={<Mint/>} />
                <Route path="/vote/:id" element={<Vote/>} />
                <Route path="/propose" element={<Propose/>}/>
            </Routes>
        </div>
    )
}

export default App; 