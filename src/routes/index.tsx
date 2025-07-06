import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Feed } from "../pages/feed";
import { Login } from "../pages/login";
import { SignUp } from "../pages/sign-up";

export function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}