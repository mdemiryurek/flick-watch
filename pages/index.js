import Section from '../components/Section/Section';
import styles from './index.module.scss'
import { getVideos } from '../lib/graphcms';
import { useSession } from "next-auth/client"
import Button from '../components/Button/Button';
import { useRouter } from 'next/router'

const MainVideo = ({video}) => {
  const router = useRouter();

  const navigateVideo = (pageSlug) => {
    router.push('/video/' + pageSlug);
  }
  return (
    <>
    {video && (
      <div className={styles.mainVideo}
        style={{backgroundImage: 'url(' + video.thumbnail.url + ')'}}>
            <div className={styles.videoContent}>
              <h1>{video.title}</h1>
              <p>{video.description}</p>
              <div className='space-6'>
                  <Button title='Watch now'
                    buttonStyle='fourth'
                    onClick={() => navigateVideo(video.slug)}></Button>
              </div>
            </div>
      </div>
    )}
    </>
    
  )
}

const Home = ({videos}) => {
  const [session] = useSession();

  const randomVideo = (videos) => {
    const video = videos[Math.floor(Math.random() * videos.length)];
    return video;
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  }

  const useSeenVideos = (videos) => {
      return videos.filter(video => video.seen === false || video.seen === null)
  }

  return (
    <div>
      <MainVideo video={randomVideo(videos)}></MainVideo>

      <div className='container'>
        {session && (
          <Section genre={'Recommended for you'}
            videos={useSeenVideos(videos)}></Section>
        )}
        <Section genre={'Drama'}
          videos={filterVideos(videos, 'drama')}></Section>
        <Section genre={'Fantasy'}
          videos={filterVideos(videos, 'fantasy')}></Section>
        <Section genre={'Comedy'}
          videos={filterVideos(videos, 'comedy')}></Section>
        <Section genre={'Romance'}
          videos={filterVideos(videos, 'romance')}></Section>
      </div>
    </div>
  )
}

export const getStaticProps = async() => {
  const videos = (await getVideos()) || [];
  return {
    props: { videos },
  }
}


export default Home;