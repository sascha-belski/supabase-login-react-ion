import React from 'react';
import type { Session } from '@supabase/supabase-js';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import { IonPage, IonButtons, IonMenuButton, IonHeader, IonToolbar} from '@ionic/react';

import Logos from '../components/Logos';

import { supabase } from '../supabaseClient';

interface LogoutProps {
  session: Session | null;
  setSession: (session: null) => void;
}

const Logout: React.FC<LogoutProps> = ({ session, setSession }) => {

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const doLogout = async () => {
      await supabase.auth.signOut();
      setSession(null);
      history.replace('/signin');
    };

    // Run every time /logout route is entered
    if (location.pathname === '/logout') {
      doLogout();
    }
  }, [location, history, setSession]);


    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <Logos title="Sign out" session={session} />
          </IonToolbar>
        </IonHeader>
      </IonPage>
    )};


export default Logout;
