// pages/register.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUserPlus } from 'react-icons/fa';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../styles/Form.module.css';

interface RegisterFormInputs {
    name: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: RegisterFormInputs) => {
        console.log(data);
        // Aqui você pode chamar a API para registrar o usuário
    };

    return (
        <div className={styles.container}>
            <FaUserPlus size={50} color="#0070f3" />
            <h1>Registro</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="name">Nome</label>
                    <input id="name" type="text" {...register('name')} />
                    {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                </div>
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
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default Register;
