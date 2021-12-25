import PropTypes from 'prop-types';
import styles from './Modal.module.scss'
import Image from 'next/image';
import closeIcon from '../../public/close.svg'
import { useRef } from 'react';

const Modal = (props) => {
    const dialogRef = useRef(null);

    return (
        <div className={`${styles.dialog} ${styles.active}`}>
            <div className={styles.backdrop}></div>

            <div className={styles.container}
                style={{width: props.width ? props.width : '100%'}}
                role={props.role}
                aria-modal='true'
                aria-labelledby='dialog-title'
                ref={dialogRef}>
                <div className={styles.head}>
                    <h2 id='dialog-title'>{props.title}</h2>
                    <button className={styles.closeButton}
                        onClick={() => props.closeModal()}>
                        <Image src={closeIcon}
                            width='24px'
                            height='24px'
                            layout='responsive'
                            alt='Close modal'></Image>
                    </button>
                </div>

                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    role: PropTypes.oneOf(['dialog', 'alertdialog']),
    width: PropTypes.string,
    open: PropTypes.bool,
    closeModal: PropTypes.func
}

Modal.defaultProps = {
    role: 'dialog',
    open: false
}

export default Modal;