import React from 'react';
import { useState } from 'react';
import type { JSX } from 'react';
import { IonPage, IonButtons, IonMenuButton, IonHeader, IonToolbar, IonContent, IonInput, IonButton, IonText, IonRouterLink  } from '@ionic/react';
import { IonCard, IonCardContent } from '@ionic/react';

import Logos from '../components/Logos';

import { supabase } from '../supabaseClient';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<JSX.Element | null>(null);

  // const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setErrorMessage(null)

    const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;

    const redirectTo =
      process.env.NODE_ENV === 'production'
        ? `${baseUrl}/#/auth/callback`
        : `${window.location.origin}/#/auth/callback`;

    // check if entry exists already
    const { data: existingUsers, error: fetchError } = await supabase
      .from('auth_users_view')
      .select('*')
      .eq('email', email);

    if (fetchError) {
      //setError(fetchError.message);
      setErrorMessage(<>{fetchError.message}</>);
      setLoading(false);
      return;
    }

    if (existingUsers && existingUsers.length > 0) {
      // setError('This email is already registered. Please sign in instead.');
      setErrorMessage(
        <>
          This email is already registered. Please{' '}
          <IonRouterLink routerLink="/signin">sign in</IonRouterLink>.
        </>
      );
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
      emailRedirectTo: redirectTo // optional: redirect after confirmation
        //emailRedirectTo: `${window.location.origin}/signin` // optional: redirect after confirmation
      }
    });
    if (error) {
      //setError(error.message)
      setErrorMessage(<>{error.message}</>);
    } else  {
      setMessage("Sign-up successful! Check your email to confirm your account.");
    }

    setLoading(false);
    console.log(data);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <Logos title="Sign up"/>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <p>New User? Sign up here</p>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonInput
              placeholder="Email"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
            />
            <IonInput
              type="password"
              placeholder="Password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
            />
            {errorMessage  && <IonText color="danger">{errorMessage }</IonText>}
            {message && <IonText color="success">{message}</IonText>}
            <IonButton expand="full" onClick={handleSignUp} disabled={loading}>
              {loading ? 'Signing up...' : errorMessage  ? 'Signing up failed' : email ? 'Signed up' : 'Sign up'}
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )};


export default Signup;
