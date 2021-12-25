import PropTypes from 'prop-types';
import styles from './Textbox.module.scss'
import searchIcon from '../../public/search.svg'
import Image from 'next/image';

const Textbox = (props) => {
    const { value, validation, required, validateMessage } = props.config;

    return(
        <div className={`${(styles.container)} ${(styles[props.fieldStyle])} ${(validation && styles.invalid)}`}>
            { props.title &&
                (<label htmlFor={props.name}
                    className={styles.title}>
                    {props.title} {required && " *"}
                </label>)
            }
            {props.type==='search' && (
                <Image src={searchIcon}
                    width='24px'
                    height='24px'
                    alt='Search'
                    tabIndex='-1'></Image>
            )}
            <input type={props.type}
                id={props.name}
                name={props.name}
                onChange={(e) => props.onChange(e)}
                disabled={props.disabled}
                className={styles.field}
                placeholder={props.placeHolder}></input>
            {validation && (
                <p aria-live="polite">
                    {validateMessage}
                </p>
            )}
        </div>
    )
}

Textbox.propTypes = {
    name: PropTypes.string,
    config: PropTypes.object,
    title: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password', 'search']),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    placeHolder: PropTypes.string,
    fieldStyle: PropTypes.oneOf(['default', 'secondary'])
}

Textbox.defaultProps = {
    type: 'text',
    fieldStyle: 'default',
    disabled: false
}

export default Textbox;