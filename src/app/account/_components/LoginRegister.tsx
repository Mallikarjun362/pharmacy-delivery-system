'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CSSProperties, useState } from 'react';
import styles from '../styles.module.css';
import axios from 'axios';
import * as z from 'zod';

const login_schema = z
  .object({
    user_type: z.string(),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Please enter valid email' })
      .toLowerCase(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be minimum 8 characters long')
      .max(50, 'Max password length is 50 characters'),
  })
  .refine((data) => data.user_type !== '', {
    message: 'Select a user type',
    path: ['user_type'],
  });

const register_schema = z
  .object({
    user_type: z.string(),
    first_name: z
      .string({ required_error: 'First name is required' })
      .min(3, 'First name should be minimum 3 characters long')
      .max(50, 'Maximum 50 characters long'),
    last_name: z.optional(z.string().max(50, 'Maximum 50 characters long.')),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be minimum 8 characters long')
      .max(50, 'Max password length is 50 characters'),
    confirm_password: z
      .string({ required_error: 'Confirm password is required' })
      .min(8, 'Password must be minimum 8 characters long')
      .max(50, 'Max password length is 50 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Please enter valid email' })
      .toLowerCase(),
    phone_number: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

type LoginInputs = z.infer<typeof login_schema>;
type RegisterInputs = z.infer<typeof register_schema>;

export default function LoginRegister() {
  const [primary_state, setPrimaryState] = useState<'LOGIN' | 'REGISTER'>(
    'LOGIN'
  );

  // ------------------------ LOGIN ------------------------
  const login_form = useForm<LoginInputs>({
    resolver: zodResolver(login_schema),
  });
  const loginFormSubmitHandler: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    login_form.reset();
  };

  // ------------------------ REGISTER ------------------------
  const register_form = useForm<RegisterInputs>({
    resolver: zodResolver(register_schema),
  });
  const registerFormSubmitHandler: SubmitHandler<RegisterInputs> = async (
    data
  ) => {
    console.log(data);
    await axios.post('/account/api/register', data);
    // register_form.reset();
  };
  const comman_button_style: CSSProperties = {
    padding: '10px 20px',
    fontSize: '20px',
    width: '50%',
  };
  return (
    <div
      style={{
        backdropFilter: 'blur(10px)',
        border: '2px solid #0003',
        backgroundColor: '#0006',
        borderRadius: '10px',
        overflow: 'hidden',
        width: '35vw',
      }}
    >
      <div style={{ display: 'flex', borderBottom: '2px solid black' }}>
        <button
          onClick={() => setPrimaryState('LOGIN')}
          style={{
            ...comman_button_style,
            backgroundColor: primary_state == 'LOGIN' ? '#36C0E5' : '#36C0E555',
            color: primary_state == 'LOGIN' ? '#000' : '#0007',
          }}
        >
          Log in
        </button>
        <div style={{ border: '1px solid black' }}></div>
        <button
          onClick={() => setPrimaryState('REGISTER')}
          style={{
            ...comman_button_style,
            backgroundColor:
              primary_state == 'REGISTER' ? '#36C0E5' : '#36C0E555',
            color: primary_state == 'REGISTER' ? '#000' : '#0007',
          }}
        >
          Register
        </button>
      </div>
      {primary_state == 'LOGIN' ? (
        <form
          className={`${styles.basicForm}`}
          onSubmit={login_form.handleSubmit(loginFormSubmitHandler)}
        >
          <h1>Login</h1>
          <br />
          <div className={`${styles.inputBlock}`}>
            <select defaultValue={''} {...login_form.register('user_type')}>
              <option value="" disabled>
                - - Select user type - -
              </option>
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
              <option value="DELIVERY">Delivery Person</option>
            </select>
            <div className={`${styles.errorMessage}`}>
              {login_form.formState.errors.user_type?.message}
            </div>
          </div>
          <div className={`${styles.inputBlock}`}>
            <input
              type="text"
              placeholder="Email"
              {...login_form.register('email')}
            />
            <div className={`${styles.errorMessage}`}>
              {login_form.formState.errors.email?.message}
            </div>
          </div>
          <div className={`${styles.inputBlock}`}>
            <input
              type="password"
              placeholder="Password"
              {...login_form.register('password')}
            />
            <div className={`${styles.errorMessage}`}>
              {login_form.formState.errors.password?.message}
            </div>
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <form
          className={`${styles.basicForm}`}
          onSubmit={register_form.handleSubmit(registerFormSubmitHandler)}
        >
          <h1>Register</h1>
          <div className={`${styles.inputBlock}`}>
            <select defaultValue={''} {...register_form.register('user_type')}>
              <option value="" disabled>
                - - Select user type - -
              </option>
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
              <option value="DELIVERY">Delivery Person</option>
            </select>
            <div className={`${styles.errorMessage}`}>
              {register_form.formState.errors.user_type?.message}
            </div>
          </div>
          <div className={`${styles.inputBlock}`}>
            <input
              type="text"
              placeholder="First name"
              {...register_form.register('first_name')}
            />
            <div className={`${styles.errorMessage}`}>
              {register_form.formState.errors.first_name?.message}
            </div>
          </div>
          <div className={`${styles.inputBlock}`}>
            <input
              type="text"
              placeholder="Last name (Optional)"
              {...register_form.register('last_name')}
            />
            <div className={`${styles.errorMessage}`}>
              {register_form.formState.errors.last_name?.message}
            </div>
          </div>
          <div className={`${styles.inputBlock}`}>
            <input
              type="text"
              placeholder="Phone number (Optional)"
              {...register_form.register('phone_number')}
            />
            <div className={`${styles.errorMessage}`}>
              {register_form.formState.errors.phone_number?.message}
            </div>
          </div>
          <div className={`${styles.inputBlock}`}>
            <input
              type="text"
              placeholder="Email"
              {...register_form.register('email')}
            />
            <div className={`${styles.errorMessage}`}>
              {register_form.formState.errors.email?.message}
            </div>
          </div>
          <div className={`${styles.inputBlock}`}>
            <input
              type="password"
              placeholder="Password"
              {...register_form.register('password')}
            />
            <div className={`${styles.errorMessage}`}>
              {register_form.formState.errors.password?.message}
            </div>
          </div>
          <div className={`${styles.inputBlock}`}>
            <input
              type="password"
              placeholder="Confirm password"
              {...register_form.register('confirm_password')}
            />
            <div className={`${styles.errorMessage}`}>
              {register_form.formState.errors.confirm_password?.message}
            </div>
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      )}
    </div>
  );
}
