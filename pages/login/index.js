import Button from "../../components/Button/Button";
import Textbox from "../../components/Textbox/Textbox";
import { useInput } from "../../hooks/useInput";
import { signIn } from "next-auth/client"
import Alert from "../../components/Alert/Alert";
import { useState } from "react";
import { checkValidForm, validateForm } from "../../lib/validation";
import { useRouter } from 'next/router'
import styles from './login.module.scss'

const Login = () => {
    const LOGIN_INITIAL_VALUE = {
        email: {
            value: '',
            validation: false,
            required: true,
            validateType: 'emailValidation',
            validateMessage: ''
        },
        password: {
            value: '',
            validation: false,
            required: true,
            validateType: 'emptyValidation',
            validateMessage: ''
        }
    }
    const [loginInputs, setLoginInputs, setNewLoginInputs] = useInput(LOGIN_INITIAL_VALUE);
    const [loginError, setLoginError] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const router = useRouter();

    const submitLogin = async(e) => {
        e.preventDefault();
        setFormLoading(true);

        const validate = validateForm(loginInputs);
        setNewLoginInputs(validate);

        if(checkValidForm(validate)){
            const account = {
                email: loginInputs.email.value,
                password: loginInputs.password.value
            };
            
            signIn("credentials", {
                redirect: false,
                email: loginInputs.email.value,
                password: loginInputs.password.value
            }).then((result) => {
                if(result.ok)
                    router.push('/');
                else
                    setLoginError(true)
            })
            .catch(() => {
                setLoginError(true)
            });
        }

        setFormLoading(false);
    }

    return (
        <div className='small-container'>
            <h1>Login</h1>
            {loginError && (
                <Alert type='error'>
                    Login failed! Please check your information.
                </Alert>
            )}

            <p className="fc-blue-light">To browser movies, please log in to Flick Watch.</p>

            <form onSubmit={(e) => submitLogin(e)}
                className="space-6">
                <Textbox name='email'
                    title='Email address'
                    config={loginInputs.email}
                    onChange={setLoginInputs}>
                </Textbox>
                <Textbox name='password'
                    title='Password'
                    config={loginInputs.password}
                    onChange={setLoginInputs}
                    type='password'>
                </Textbox>


                <Button title="Login"
                    type="submit"
                    loading={formLoading}>
                </Button>
            </form>
        </div>
    )
}

export default Login;