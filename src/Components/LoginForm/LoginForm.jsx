import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './LoginForm.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

export const LoginForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
    } = useForm();

    const {
        register: registerRegister,
        handleSubmit: handleSubmitRegister,
        formState: { errors: errorsRegister },
    } = useForm();

    const handleLogin = (data) => {
        console.log('Login data:', data);
        // Логика для обработки логина
    };

    const handleRegistration = (data) => {
        console.log('Registration data:', data);
        // Логика для обработки регистрации
    };

    return (
        <div className={`wrapper ${isRegistering ? 'active' : ''}`}>
            <div className="form-box login">
                <form onSubmit={handleSubmitLogin(handleLogin)}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" {...registerLogin('name', { required: 'Введите имя' })} />
                        <FaUser className="icon" />
                        <small className="text-danger">{errorsLogin.name && errorsLogin.name.message}</small>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            {...registerLogin('password', {
                                required: 'Введите пароль',
                                minLength: { value: 8, message: 'Пароль должен содержать минимум 8 символов' },
                                validate: {
                                    complexity: (value) =>
                                        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(value) ||
                                        'Пароль должен содержать хотя бы одну заглавную букву, одну цифру и один специальный символ',
                                },
                            })}
                        />
                        <FaLock className="icon" />
                        <small className="text-danger">{errorsLogin.password && errorsLogin.password.message}</small>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <span className="link-button" onClick={() => alert('Forgot password?')}>
                            Forgot password?
                        </span>
                    </div>
                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>
                            Don't have an account?{' '}
                            <span onClick={() => setIsRegistering(true)} className="link-button">
                                Register
                            </span>
                        </p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={handleSubmitRegister(handleRegistration)}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" {...registerRegister('name', { required: 'Введите имя' })} />
                        <FaUser className="icon" />
                        <small className="text-danger">{errorsRegister.name && errorsRegister.name.message}</small>
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            {...registerRegister('email', {
                                required: 'Введите Email',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Введите корректный Email',
                                },
                            })}
                        />
                        <FaEnvelope className="icon" />
                        <small className="text-danger">{errorsRegister.email && errorsRegister.email.message}</small>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            {...registerRegister('password', {
                                required: 'Введите пароль',
                                minLength: { value: 8, message: 'Пароль должен содержать минимум 8 символов' },
                                validate: {
                                    complexity: (value) =>
                                        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(value) ||
                                        'Пароль должен содержать хотя бы одну заглавную букву, одну цифру и один специальный символ',
                                },
                            })}
                        />
                        <FaLock className="icon" />
                        <small className="text-danger">{errorsRegister.password && errorsRegister.password.message}</small>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> I agree to the terms & conditions
                        </label>
                    </div>
                    <button type="submit">Register</button>

                    <div className="register-link">
                        <p>
                            Already have an account?{' '}
                            <span onClick={() => setIsRegistering(false)} className="link-button">
                                Login
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
