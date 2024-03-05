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

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
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
        <Route
          path="/create-blog"
          element={
            <PrivateRoute>
              <CreateBlogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PrivateRoute>
              <SingleBlog />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<>Not Found!</>} />
      </Routes>
    </AuthProvider>
  );
}
