'use client';

import Modal from './Modal';

import useLoginModal from '@/app/hooks/useLoginModal';
import { handleLogin } from '@/app/lib/actions';
import apiService from '@/app/services/apiService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomButton from '../buttons/CustomButton';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin = async () => {
    const formData = {
      email: email,
      password: password,
    };

    const response = await apiService.postWithoutToken('/api/auth/login/', formData);

    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);

      loginModal.close();

      router.push('/');
    } else {
      setErrors(response.non_field_errors);
    }
  };

  const content = (
    <>
      <form action={submitLogin} className="space-y-4">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your e-mail address"
          type="email"
          className="h-[54px] w-full rounded-xl border border-gray-300 px-4"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          type="password"
          className="h-[54px] w-full rounded-xl border border-gray-300 px-4"
        />

        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className="rounded-xl bg-secondchance p-5 text-white opacity-80"
            >
              {error}
            </div>
          );
        })}

        <CustomButton label="Submit" onClick={submitLogin} />
      </form>
    </>
  );

  return (
    <Modal isOpen={loginModal.isOpen} close={loginModal.close} label="Log in" content={content} />
  );
};

export default LoginModal;
