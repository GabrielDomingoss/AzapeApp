import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { DefaultLayout } from "./layout";
import { ResetPassword } from "./pages/resetPassword";

export function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/resetPassword" element={<ResetPassword />}></Route>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
        </Routes>
    )
}