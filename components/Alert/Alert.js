import PropTypes from 'prop-types';
import { useRef } from 'react';
import styles from './Alert.module.scss'

const Alert = (props) => {
    const alertRef = useRef(null);

    return (
        <div ref={alertRef}
             className={`${styles.alert} ${styles[props.type]}`}
             role={props.role}>
            {props.children}
        </div>
    )
}

Alert.propTypes = {
    type: PropTypes.oneOf(['error', 'success', 'info']),
    role: PropTypes.string
}

Alert.defaultProps = {
    role: "alert"
}

export default Alert;