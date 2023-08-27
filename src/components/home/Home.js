import { useEffect, useState } from 'react';
import { Header } from '../header/Header';
import { UserInfo } from '../user_info/UserInfo';
import { FilesList } from '../filesList/FilesList';

export const Home = (props) => {

    return (
        <>
            <Header />
            <UserInfo />
            <FilesList />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <button onClick={props.handleSignOut} style={{ padding: '10px 40px', margin: '0 20px', border: 'none', background: 'grey' }}>Sign out</button>
            </div>
        </>
    )
}