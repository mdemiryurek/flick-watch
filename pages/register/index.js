import Button from "../../components/Button/Button";
import Textbox from "../../components/Textbox/Textbox";
import { useInput } from "../../hooks/useInput";
import Alert from "../../components/Alert/Alert";
import { createAccount } from "../../lib/graphcms";
import { validateForm, checkValidForm } from "../../lib/validation";
import { useState } from "react";
import { useRouter } from 'next/router'
import styles from './register.module.scss'
import Link from "next/link";

const Register = () => {
    const REGISTER_INITIAL_VALUE = {
        name: {
            value: '',
            validation: false,
            required: true,
            validateType: 'stringValidation',
            validateMessage: ''
        },
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
    const [formLoading, setFormLoading] = useState(false);
    const [formSuccess, setFormSuccess] = useState(null);
    const [registerInputs, setRegisterInputs, setNewRegisterInputs] = useInput(REGISTER_INITIAL_VALUE);
    const router = useRouter();

    const submitRegister = async(e) => {
        e.preventDefault();
        setFormLoading(true);
        
        const validate = validateForm(registerInputs);
        setNewRegisterInputs(validate);
        
        if(checkValidForm(validate)){
            const account = {
                email: registerInputs.email,
                password: registerInputs.password,
                name: registerInputs.name
            };
    
            try{
                const { data } = await createAccount(account);
                setFormSuccess(data.createAccount.id ? true : false);
            }
            catch{
                setFormSuccess(false);
            }
        }
        
        setFormLoading(false);
    }

    return (
        <div className="small-container">
            <h1>Register for free</h1>
            {formSuccess && (
                <Alert type='success'>
                    You have successfully registered. Please <Link href='/login'>click here</Link> to log in.
                </Alert>
            )}
            {formSuccess !== null && !formSuccess && (
                <Alert type='error'>
                    Something went wrong. Please check your information.
                </Alert>
            )}
            
            {!formSuccess && (
                <>
                    <p className="fc-blue-light">Flick Watch is a <u>free platform</u>. Register with your email address.</p>
                    <form onSubmit={(e) => submitRegister(e)}
                        className="space-6">
                        <Textbox name='email'
                            title='Email address'
                            config={registerInputs.email}
                            onChange={setRegisterInputs}>
                        </Textbox>
                        <Textbox name='password'
                            title='Password'
                            config={registerInputs.password}
                            onChange={setRegisterInputs}
                            type='password'>
                        </Textbox>
                        <Textbox name='name'
                            title='Full name'
                            config={registerInputs.name}
                            onChange={setRegisterInputs}>
                        </Textbox>

                        <Button title="Complete registration"
                            type="submit"
                            loading={formLoading}>
                        </Button>
                    </form>
                </>
            )}
        </div>
    )
}

export default Register;