import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { useHistory } from 'react-router-dom';
import {IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput,
        IonButton, IonLabel, IonItem, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton
       } from '@ionic/react';

import Logos from '../components/Logos';

import { supabase } from '../supabaseClient';

interface AboutProps {
  session: Session | null;
}

const CompleteProfile: React.FC<AboutProps> = ({ session }) => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  // console.log('call from completeprofile session='+session);
  const handleSave = async () => {
    setError(null);

  if (!session?.user) {
    setError('User not logged in.');
    return;
  }

  const user = session.user;

  const { error: dbError } = await supabase
    .from('profiles')
    .update({ full_name: name, avatar_url: photoUrl })
    .eq('id', user.id);

    if (dbError) {
      setError(dbError.message);
    } else {
      history.push('/dashboard'); // redirect to main page after profile completion
    }
  };

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
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Complete Your Profile</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {error && <IonText color="danger">{error}</IonText>}
            <IonItem>
              <IonLabel position="stacked">Full Name</IonLabel>
              <IonInput
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
                placeholder="Enter your full name"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Profile Photo URL</IonLabel>
              <IonInput
                value={photoUrl}
                onIonChange={(e) => setPhotoUrl(e.detail.value!)}
                placeholder="Enter photo URL"
              />
            </IonItem>
            <IonButton expand="block" onClick={handleSave} style={{ marginTop: '1em' }}>
              Save Profile
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CompleteProfile;
