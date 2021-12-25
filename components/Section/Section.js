import Image from "next/image";
import Link from "next/link";
import styles from '../Section/Section.module.scss'

const Section = ({genre, videos}) => {
    return (
        <div className={styles.section}>
            <h2>{genre}</h2>

            <div className={styles.feed}>
                {videos.map(video => (
                    <Link key={video.id}
                        href={`/video/${video.slug}`}>
                        <a className={styles.card}>
                            <Image src={video.thumbnail.url}
                                alt={video.title}
                                layout="responsive"
                                width='100px'
                                height='70px'></Image>
                            <div>
                                <h3>{video.title}</h3>
                            </div>
                        </a>
                    </Link>
                ))}
            </div>
            
        </div>
    )
}

export default Section;