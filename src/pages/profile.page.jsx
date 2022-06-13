import { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { LoadingContext } from 'react-router-loading';
import AuthContext from '../contexts/auth.context';
import { infoStore } from '../store/info.store';
import { PageWrapper } from '../Wrappers/pages.wrapper'
export function ProfilePage() {
    const loadingContext = useContext(LoadingContext);

    useEffect(() => {
        document.title = `${infoStore.brandName.fa} - پروفایل`;
        loadingContext.done();
    }, [])
    const authContext = useContext(AuthContext);
    if (!authContext.isAuthenticated) {
        return <Redirect to="/" />
    }



    return (
        <PageWrapper>
            <h1>Profile Page</h1>
        </PageWrapper>
    )
}