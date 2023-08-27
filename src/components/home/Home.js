import { Header } from '../header/Header';
import { UserInfo } from '../user_info/UserInfo';
import { FilesList } from '../filesList/FilesList';
import './home.css';

export const Home = (props) => {

    return (
        <>
            <Header />
            <UserInfo />
            <FilesList />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
                <button onClick={props.handleSignOut} className='signout-button'>Sign out</button>
            </div>
        </>
    )
}