import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { LoginRegisterPreview } from "./pages/loginRegisterPreview";
import { SignUp } from "./pages/signUp";
import { Login } from "./pages/login";
import { GetInMyProfile } from "./pages/getInMyProfile";
import { EditMyProfile } from "./pages/editMyProfile";
import { ServicesView } from "./pages/servicesView";
import { PostForAService } from "./pages/postForAService";
import { RequestsHistory } from "./pages/requestsHistory";
import { AvailableRequests } from "./pages/availableRequests";
import { TakenRequests } from "./pages/takenRequests";
import { PendingForApprovalRequests } from "./pages/pendingForApprovalRequests";
import { RequestsServicesInProcess } from "./pages/requestsSerivicesInProcess";
import { OnlyReviewUserProfile } from "./pages/onlyReviewUserProfile";

import injectContext from "./store/appContext";


import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<LoginRegisterPreview />} path="/loginRegisterPreview" />
                        <Route element={<SignUp />} path="/signUp" />
                        <Route element={<Login />} path="/login"  />
                        <Route element={<GetInMyProfile />} path="/myProfile" />
                        <Route element={<EditMyProfile />} path="/editMyProfile" />
                        <Route element={<ServicesView />} path="/services" />
                        <Route element={<PostForAService />} path="/postForAService/:serviceSubcategoryId" />
                        <Route element={<RequestsHistory />} path="/requestHistory" />
                        <Route element={<AvailableRequests />} path="/availableRequests" />
                        <Route element={<TakenRequests />} path="/takenRequests" />
                        <Route element={<PendingForApprovalRequests />} path="/pendingRequests" />
                        <Route element={<RequestsServicesInProcess />} path="/requestsInProcess"  />
                        <Route element={<OnlyReviewUserProfile />} path="/reviewProfile/:userId" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
