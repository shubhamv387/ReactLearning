import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import authContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();

  const authCtx = useContext(authContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newEnteredPassword = newPasswordInputRef.current.value;

    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${
          import.meta.env.VITE_FIREBASE_API_KEY
        }`,
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
            password: newEnteredPassword,
            returnSecureToken: false,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = 'Failed to Update!';
        if (data && data.error && data.error.message)
          errorMessage = data.error.message;

        throw new Error(errorMessage);
      }

      alert('Password changed successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          ref={newPasswordInputRef}
          minLength='7'
          type='password'
          id='new-password'
        />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
