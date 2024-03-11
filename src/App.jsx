import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import CreateBlogPage from "./pages/CreateBlogPage";
import SingleBlog from "./pages/SingleBlog";

import PublicRoute from "./routes/PublicRoute";

import PrivateRoute from "./routes/PrivateRoute";
import AuthProvider from "./providers/AuthProvider";
import BlogProvider from "./providers/BlogProvider";
import ProfileProvider from "./providers/ProfileProvider";

export default function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <ProfileProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegistrationPage />
                </PublicRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route
              path="/create-blog"
              element={
                <PrivateRoute>
                  <CreateBlogPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-blog/:id"
              element={
                <PrivateRoute>
                  <CreateBlogPage />
                </PrivateRoute>
              }
            />
            <Route path="/blog/:id" element={<SingleBlog />} />

            <Route path="*" element={<>Not Found!</>} />
          </Routes>
        </ProfileProvider>
      </BlogProvider>
    </AuthProvider>
  );
}
