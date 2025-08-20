import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js';
import { IonApp } from '@ionic/react';
import { IonRouterOutlet, IonSpinner } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

import './App.css'

import AppMenu from './components/AppMenu';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Logout from './pages/Logout';

import About from './pages/About';
import Dashboard from './pages/Dashboard';
import CompleteProfile from './pages/CompleteProfile';
import AuthCallback from './pages/AuthCallback';

import { supabase } from './supabaseClient';

type Profile = {
  id: string | null;
  first_name?: string | null;
  last_name?: string | null;
  birthday?: string | null;
  avatar_url?: string | null;
  tech_stack?: string | null;
  languages?: string | null;
  hobbies?: string | null;
};

const App: React.FC = () => {

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstTimeLogin, setFirstTimeLogin] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  //const history = useHistory();
  //console.log(!!session);

  //console.log((profile)?.full_name);

  const fetchProfile = async (session: Session | null) => {
    //setSession(session);
    if (session?.user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      setProfile(profileData || null);
    } else {
      setProfile(null);
    }
  };

  useEffect(() => {

// Get initial session and profile
    const getSessionAndProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);
      //console.log('from App session='+session);

      if (session?.user) {
        await fetchProfile(session)
      } else {
        setProfile(null);
      }
    };

    getSessionAndProfile();

    // Subscribe to auth changes
    const {data: { subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      fetchProfile(session);
      console.log('in subscription profile fetsched');
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
      return <div><IonSpinner name="dots"></IonSpinner></div>;  // or a spinner component
    }
  return (
    <>
      <IonApp>
        <AppMenu session={session} />
        <IonRouterOutlet id="main-content">
          <Route exact path="/signin">
            <Signin session={session}
                    setSession={setSession}
                    firstTimeLogin={firstTimeLogin}
                    setFirstTimeLogin={setFirstTimeLogin}
            />
          </Route>

         <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/auth/callback">
            <AuthCallback setFirstTimeLogin={setFirstTimeLogin} />
          </Route>

          <Route exact path="/logout">
            <Logout session={session} setSession={setSession} />
          </Route>

          <Route exact path="/about">
            <About session={session} />
          </Route>

          <Route exact path="/dashboard">
            <Dashboard session={session} profile={profile} />
          </Route>

          <Route exact path="/complete-profile">
            <CompleteProfile session={session} profile={profile} setProfile={setProfile} />
          </Route>

          <Route exact path="/">
            {session ? <Redirect to="/about" /> : <Redirect to="/signin" />}
          </Route>
        </IonRouterOutlet>
      </IonApp>
    </>
  )};

export default App;
