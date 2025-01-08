// pages/login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../styles/Form.module.css';

interface LoginFormInputs {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

const Login: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
        // Aqui você pode chamar a API para fazer o login
    };

    return (
        <div className={styles.container}>
            <FaSignInAlt size={50} color="#0070f3" />
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="email">E-mail</label>
                    <input id="email" type="email" {...register('email')} />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Senha</label>
                    <input id="password" type="password" {...register('password')} />
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                <button type="submit" className={styles.button}>
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
