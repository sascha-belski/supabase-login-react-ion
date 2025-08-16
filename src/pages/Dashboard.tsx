import React from 'react';
import type { Session } from '@supabase/supabase-js';
import { IonPage, IonButtons, IonMenuButton, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import { IonCard, IonCardContent } from '@ionic/react';

import Logos from '../components/Logos';

type Profile = {
  id: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
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
          <Logos title="About" session={session} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            {profile ? <p>Welcome, {profile.full_name ?? "User"}</p> : <p>Loading...</p>}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )};

export default Dashboard;
