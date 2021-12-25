import Image from 'next/image';
import Link from 'next/link';
import styles from './slug.module.scss'
import backIcon from '../../public/back.svg'
import playIcon from '../../public/play.svg'
import closeIcon from '../../public/close.svg'
import { useEffect, useState } from 'react';
import { getVideoBySlug } from '../../lib/graphcms';
import { useSession } from "next-auth/client"
import Button from '../../components/Button/Button';
import { isMobileView } from '../../lib/helper';
import { useRouter } from 'next/router'

const Video = ({video}) => {
    const router = useRouter();
    const [session] = useSession();
    const [watching, setWatching] = useState(false);
    const [mobileView, setMobileView] = useState(false);

    const toggleVideo = () => {
        setWatching(!watching);
    }

    useEffect(() => {
        const handleResize = () => {
            handleMobileView();
        }

        handleMobileView();
        window.addEventListener('resize', handleResize);
    }, [])

    const handleMobileView = () => {
        setMobileView(isMobileView());
    }

    return(
        <>
            {!watching && (
                <div className={styles.container}
			        style={{backgroundImage: 'url(' + video.thumbnail.url + ')'}}>
                    <div className={styles.thumbnail}>
                        <Link href='/'>
                            <a className={styles.backButton}>
                                <Image src={backIcon}
                                    width='24px'
                                    height='24px'
                                    alt='Back'>
                                    </Image>
                                Go back
                            </a>
                        </Link>
                        { session && (
                            <button className={styles.playButton}
                                onClick={toggleVideo}>
                                <Image src={playIcon}
                                    width='160px'
                                    height='160px'
                                    alt='Play'></Image>
                            </button>
                        )}
                        <div className={styles.description}>
                            <h1>{video.title}</h1>
                            <p>{video.description}</p>
                            {!session && (
                                <div className={styles.memberButtons}>
                                    <Button title='Register for free' onClick={() => router.push('/register')}></Button>
                                    
                                    <span className='fs-small fc-blue-light'><Link href='/login'>click here</Link> to log in.</span>
                                </div>
                                
                            )}
                        </div>
                    </div>
                    { !mobileView && (
                        <video width='100%'
                            autoPlay loop
                            className={styles.trailerVideo}>
                            <source src={video.mp4.url} type='video/mp4'></source>
                        </video>
                    )}
                    
                </div>
            )}

            {watching && (
                <div className={styles.container}>
                    <button className={styles.closeButton}
                        onClick={toggleVideo}>
                        <Image src={closeIcon}
                            width='36px'
                            height='36px'
                            alt='Close'></Image>
                    </button>

                    <video width='100%'
                        autoPlay controls
                        className={styles.video}>
                        <source src={video.mp4.url} type='video/mp4'></source>
                    </video>
                </div>
                
            )}
            
        </>
        
    )
}

export const getServerSideProps = async(pageContext) => {
    const pageSlug = pageContext.query.slug;
    const video = (await getVideoBySlug(pageSlug)) || null;

    return {
        props: { video}
    }
}

export default Video;