import { useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { useHistory } from 'react-router-dom';
import {IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput,
        IonButton, IonLabel, IonItem, IonText, IonHeader, IonToolbar, IonButtons, IonMenuButton,
        IonDatetime, IonDatetimeButton, IonModal
       } from '@ionic/react';

import Logos from '../components/Logos';

import { supabase } from '../supabaseClient';

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

interface AboutProps {
  session: Session | null;
  // profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

const CompleteProfile: React.FC<AboutProps> = ({ session, setProfile }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [birthday, setBirthday] = useState<string | null>(null);
  const [techStack, setTechStack] = useState('');
  const [languages, setLanguages] = useState('');
  const [hobbies, setHobbies] = useState('');
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

  const { data, error: dbError } = await supabase
    .from('profiles')
    .update({ first_name: fname,
              last_name: lname,
              avatar_url: photoUrl,
              birthday: birthday,
              tech_stack: techStack,
              languages: languages,
              hobbies: hobbies })
    .eq('id', user.id)
    .select()
    .single(); // return updated row

    if (dbError) {
      setError(dbError.message);
    } else {
      // update profile in app.tsx
      setProfile(data);
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
              <IonLabel position="stacked">First Name</IonLabel>
              <IonInput
                value={fname}
                onIonChange={(e) => setFname(e.detail.value!)}
                placeholder="Enter your first name"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Last Name</IonLabel>
              <IonInput
                value={lname}
                onIonChange={(e) => setLname(e.detail.value!)}
                placeholder="Enter your last name"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Birthday</IonLabel>
              <IonDatetimeButton datetime="birthday-datetime" />
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  id="birthday-datetime"
                  presentation="date"
                  value={birthday}
                  onIonChange={(e: CustomEvent) => {
                    const value = e.detail.value;
                    setBirthday(value); }}
                />
              </IonModal>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Tech Stack</IonLabel>
              <IonInput
                value={techStack}
                onIonChange={(e) => setTechStack(e.detail.value!)}
                placeholder="Enter your tech stack"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Languages</IonLabel>
              <IonInput
                value={languages}
                onIonChange={(e) => setLanguages(e.detail.value!)}
                placeholder="Enter languages you know"
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Hobbies</IonLabel>
              <IonInput
                value={hobbies}
                onIonChange={(e) => setHobbies(e.detail.value!)}
                placeholder="Enter your hobbies"
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
