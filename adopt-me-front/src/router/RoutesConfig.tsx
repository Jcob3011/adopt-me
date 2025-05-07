import {useContext} from "react"
import {Outlet, Route, Routes} from "react-router-dom"
import {breadcrumbItems, menuItems, topRightMenuItems} from "../App"
import {Breadcrumb} from "../components/breadcrumb/Breadcrumb"
import Layout from "../components/layout/logged-layout/Layout"
import {Home} from "../pages/home/Home"
import {AuthContext} from "../providers/auth-provider/AuthProvider"
import {ProtectedRoute} from "./ProtectedRoute"
import {RoutePath} from "./RoutePath"
import {NotificationErrors} from "../pages/notification/NotificationErrors";
import {NotFound} from "../pages/notFound/NotFound";
import {TagCreatePage} from "../pages/tag/TagCreatePage";
import {TagDetailsPage} from "../pages/tag/TagDetailsPage";
import {TagListPage} from "../pages/tag/TagListPage";
import {Logout} from "../pages/logout/Logout"
import {Login} from "../pages/login/Login";
import {Register} from "../pages/register/Register";
import {ForgotPassword} from "../pages/forgot-password/ForgotPassword";
import {GmailAuth} from "../pages/gmail-auth/GmailAuth";
import {ActivateAccount} from "../pages/activate-account/ActivateAccount";
import {GmailSetPassword} from "../pages/gmail-set-password/GmailSetPassword";
import {PasswordReset} from "../pages/password-reset/PasswordReset";
import {Users} from "../pages/users/Users";
import {UsersDetails} from "../pages/users/details/UsersDetails";
import {UsersCreate} from "../pages/users/create/UsersCreate";
import {useTranslation} from "react-i18next";
import {ActivityLogsDetails} from "../pages/activityLogs/ActivityLogsDetails";
import {AllActivities} from "../pages/activityLogs/allActivities/AllActivities";
import {MyActivities} from "../pages/activityLogs/myActivities/MyActivities";
import {DashboardPage} from "../pages/dashboard/DashboardPage"
import {AnimalListPage} from "../pages/animal/AnimalPage";
import {AnimalDetails} from "../pages/animal/details/AnimalDetails";
import {CreateAnimalPage} from "../pages/animal/create/CreateAnimalPage";
import {ArticleListPage} from "../pages/article/ArticlePage";
import {CreateArticlePage} from "../pages/article/create/CreateArticlePage";
import {ArticleDetails} from "../pages/article/details/ArticleDetils";


export const RoutesConfig = () => {

    const {t} = useTranslation()
    const {loggedUser} = useContext(AuthContext)

    return (
        <Routes>
            <Route
                element={
                    loggedUser ?
                        <Layout
                            menuItems={menuItems(t)}
                            topRightMenuItems={topRightMenuItems(t, loggedUser.id)}>
                            <Breadcrumb breadcrumbItems={breadcrumbItems}/>
                            <Outlet/>
                        </Layout> :
                        <Outlet/>
                }>
                <Route path={RoutePath.HOME} element={
                    <ProtectedRoute>
                        <AllActivities/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.ACTIVITY_LOGS} element={
                    <ProtectedRoute>
                        <AllActivities/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.ACTIVITY_LOGS_DETAILS} element={
                    <ProtectedRoute>
                        <ActivityLogsDetails/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.MY_ACTIVITY_LOGS} element={
                    <ProtectedRoute>
                        <MyActivities/>
                    </ProtectedRoute>}
                />

                <Route path={RoutePath.NOTIFICATION_ERRORS} element={
                    <ProtectedRoute>
                        <NotificationErrors/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.NOT_FOUND} element={
                    <ProtectedRoute>
                        <NotFound/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.TAG_CREATE_PAGE} element={
                    <ProtectedRoute>
                        <TagCreatePage/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.TAG_DETAILS_PAGE} element={
                    <ProtectedRoute>
                        <TagDetailsPage/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.TAG_LIST_PAGE} element={
                    <ProtectedRoute>
                        <TagListPage/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.USERS} element={
                    <ProtectedRoute>
                        <Users/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.USERS_CREATE} element={
                    <ProtectedRoute>
                        <UsersCreate/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.USERS_DETAILS} element={
                    <ProtectedRoute>
                        <UsersDetails/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.HOME} element={
                    <ProtectedRoute>
                        <Home/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.ANIMAL} element={
                    <ProtectedRoute>
                        <AnimalListPage/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.ANIMAL_DETAILS_PAGE} element={
                    <ProtectedRoute>
                        <AnimalDetails/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.CREATE_ANIMAL} element={
                    <ProtectedRoute>
                        <CreateAnimalPage/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.ARTICLE} element={
                    <ProtectedRoute>
                        <ArticleListPage/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.ARTICLE_DETAILS_PAGE} element={
                    <ProtectedRoute>
                        <ArticleDetails/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.CREATE_ARTICLE} element={
                    <ProtectedRoute>
                        <CreateArticlePage/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.NOTIFICATION_ERRORS} element={
                    <ProtectedRoute>
                        <NotificationErrors/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.NOT_FOUND} element={
                    <ProtectedRoute>
                        <NotFound/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.TAG_CREATE_PAGE} element={
                    <ProtectedRoute>
                        <TagCreatePage/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.TAG_DETAILS_PAGE} element={
                    <ProtectedRoute>
                        <TagDetailsPage/>
                    </ProtectedRoute>}
                />
                <Route path={RoutePath.TAG_LIST_PAGE} element={
                    <ProtectedRoute>
                        <TagListPage/>
                    </ProtectedRoute>}
                />
            </Route>
            <Route path={RoutePath.LOGOUT} element={<Logout/>}/>
            <Route path={RoutePath.LOGIN} element={<Login/>}/>
            <Route path={RoutePath.REGISTER} element={<Register/>}/>
            <Route path={RoutePath.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
            <Route path={RoutePath.GMAIL_AUTH} element={<GmailAuth/>}/>
            <Route path={RoutePath.ACTIVATE_ACCOUNT} element={<ActivateAccount/>}/>
            <Route path={RoutePath.PASSWORD_RESET} element={<PasswordReset/>}/>
            <Route path={`${RoutePath.GMAIL_SET_PASSWORD}/:token`} element={<GmailSetPassword/>}/>

        </Routes>
    )
}
