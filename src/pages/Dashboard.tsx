import React from 'react';
import type { Session } from '@supabase/supabase-js';
import { IonPage, IonButtons, IonMenuButton, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import { IonCard, IonCardContent, IonSpinner } from '@ionic/react';

import Logos from '../components/Logos';

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

interface DashboardProps {
  session: Session | null;
  profile?: Profile | null;
}

const Dashboard: React.FC<DashboardProps> = ({ session, profile }) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <Logos title="Dashboard" session={session} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            {profile ? <p>Welcome, {profile.first_name ?? "User"}</p> : <p><IonSpinner name="dots"></IonSpinner></p>}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )};

export default Dashboard;
