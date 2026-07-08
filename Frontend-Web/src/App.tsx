import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"

export default function App(){
    return(
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
        </Routes>
    )
}