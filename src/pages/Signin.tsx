import React from 'react';
import { useState, useEffect } from 'react'
import { IonPage, IonButtons, IonMenuButton, IonHeader, IonToolbar, IonContent, IonInput, IonButton, IonRouterLink  } from '@ionic/react';
import { IonCard, IonCardContent } from '@ionic/react';

import { useHistory } from 'react-router-dom'

import Logos from '../components/Logos';

import { supabase } from '../supabaseClient';
import type { Session } from '@supabase/supabase-js';

interface SigninProps {
  session: Session | null;
  setSession: (session: Session | null) => void;
  firstTimeLogin: boolean;
  setFirstTimeLogin: (value: boolean) => void;
}

const Signin: React.FC<SigninProps> = ({ session, setSession, firstTimeLogin, setFirstTimeLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setSuccess(false);
  }, [session]);

    const handleLogin = async () => {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setSuccess(false);
        return;
      }
      else {
        if (data.session) {
          setSession(data.session);
          setSuccess(true);
          // If firstTimeCall is true, redirect to profile completion
          if (firstTimeLogin) {
            //console.log('call from login before push--firstTimeLogin='+firstTimeLogin);
            setFirstTimeLogin(false); // reset after first login
            history.push('/complete-profile');
          } else {
            //console.log('call from login before push--firstTimeLogin='+firstTimeLogin);
            history.push('/dashboard');
          }
        }
      }
    };
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <Logos title="Sign in"/>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardContent>
              <p>Sign in here</p>
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
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <IonButton expand="full" onClick={handleLogin}>
                { success ? 'Signed in' : error ? 'Sign in failed' : 'Sign in'}
              </IonButton>
              New User? <IonRouterLink routerLink="/signup">sign up</IonRouterLink > to continue.
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    )};


export default Signin;
