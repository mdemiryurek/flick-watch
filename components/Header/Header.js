import Link from "next/link";
import styles from './Header.module.scss';
import logo from '../../public/logo.svg'
import Image from "next/image";
import Button from "../Button/Button";
import { signOut, useSession } from "next-auth/client";
import { useRouter } from 'next/router'

const Header = () => {
    const router = useRouter();
    const [session] = useSession();

    const logout = () => {
        signOut({redirect: false});
    }

    const navigate = (pageName) => {
        router.push('/' + pageName);
    }
    return(
        <>
            <header className={styles.header}>
                <div className={styles.wrapper}>
                    <Link href='/'
                        className={styles.logo}
                        passHref>
                        <a>
                            <Image src={logo}
                                width='60px'
                                height='40px'
                                alt='Flick Watch'></Image>
                        </a>
                    </Link>

                    { !session && (
                        <div className={styles.member}>
                            <Button title="Login"
                                buttonStyle="third"
                                onClick={() => navigate('login')}></Button>
                            <Button title="Register"
                                onClick={() => navigate('register')}></Button>
                        </div>
                    )}
                    
                    {session && (
                        <div className={styles.account}>
                            <p>
                                Hi, {session.user.name} (<Link href='/'>
                                    <a onClick={() => logout()}>Logout</a></Link>)
                            </p>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}

export default Header;