import { Outlet, createBrowserRouter } from 'react-router-dom';
import Note from '../components/Note';
import NoteList from '../components/NoteList';
import AuthProvider from '../context/AuthProvider';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { noteLoader, notesLoader } from '../utils/noteUtils';
import ProtectedRoute from './ProtectedRoute';
import { foldersLoader } from '../utils/folderUtils';

const AuthLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};
export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },

            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <Home />,
                        path: '/',
                        loader: foldersLoader,
                        children: [
                            {
                                element: <NoteList />,
                                path: `folders/:folderId`,
                                loader: notesLoader,
                                children: [
                                    {
                                        element: <Note />,
                                        path: `note/:noteId`,
                                        loader: noteLoader
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);