import React from 'react';
import { useState } from 'react';
import type { JSX } from 'react';
import { IonPage, IonButtons, IonMenuButton, IonHeader, IonToolbar, IonContent, IonInput, IonButton, IonText, IonRouterLink  } from '@ionic/react';
import { IonCard, IonCardContent, IonSpinner } from '@ionic/react';

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

    const { data: { user } = {}, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
      emailRedirectTo: redirectTo // optional: redirect after confirmation
        //emailRedirectTo: `${window.location.origin}/signin` // optional: redirect after confirmation
      }
    });
    if (signUpError) {
      //setError(error.message)
      setErrorMessage(<>{signUpError.message}</>);
    } else  {
      // lets try to insert record into public.profiles -- trigger not functioning on supabase
        if ( user && user.id) {
        // Check if profile exists
        const { data: existingProfiles, error: profileCheckError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id);

        if (profileCheckError) {
          setErrorMessage(<>{profileCheckError.message}</>);
        } else if (!existingProfiles?.length) {
          // Insert profile
          const { error: profileInsertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: user.id,
                email: user.email
                // first_name: user.user_metadata?.first_name || ""
                // created_at: new Date().toISOString()
              }
            ]);

          if (profileInsertError) setErrorMessage(<>{profileInsertError.message}</>);
          else setMessage("Sign-up successful! Check your email to confirm your account.");
        }
      }
    }

    setLoading(false);
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
              {loading ? <IonSpinner name="dots"></IonSpinner> : errorMessage  ? 'Signing up failed' : email ? 'Signed up' : 'Sign up'}
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )};


export default Signup;
