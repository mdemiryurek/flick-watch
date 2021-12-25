import PropTypes from 'prop-types';
import styles from './Button.module.scss'

const Button = (props) => {

    const handleClick = (e) =>{
        if(props.type !== 'submit')
            e.preventDefault();

        if (props.onClick)
            props.onClick();
    }

    return (
        <button type={props.Buttontype}
            className={`${styles.button} ${(styles[props.buttonStyle])} ${props.loading && styles.loading}`}
            id={props.id}
            disabled={props.disabled || props.loading}
            onClick={(e) => handleClick(e)}>
            {props.loading && (
                <div className="loader">Loading</div>
            )}
            {props.title}
        </button>
    )
}

Button.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit']),
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    buttonStyle: PropTypes.oneOf(['primary', 'secondary', 'third', 'fourth']),
    loading: PropTypes.bool
},

Button.defaultProps = {
    type: 'button',
    disabled: false,
    buttonStyle: 'primary',
    loading: false
}

export default Button;