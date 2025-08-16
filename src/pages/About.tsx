import React from 'react';
import type { Session } from '@supabase/supabase-js';
import { IonPage, IonButtons, IonMenuButton, IonHeader, IonToolbar, IonContent } from '@ionic/react';
import { IonCard, IonCardContent } from '@ionic/react';

import Logos from '../components/Logos';

interface AboutProps {
  session: Session | null;
}

const About: React.FC<AboutProps> = ({ session }) => {

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
            <p>This is a demonstration project built using <strong>React</strong>, <strong>TypeScript</strong>, <strong>Vite</strong>, and the <strong>Ionic Framework</strong> to explore public holidays by country and date.</p>

            <p><strong>Note:</strong> This app uses a free REST API courtesy of
            <a href="https://openholidaysapi.org/swagger/index.html" target="_blank">openholidaysapi.org</a>
            for <strong>educational and demonstrational purposes only</strong>.</p>

            <p>If you're interested, feel free to fork the corresponding GitHub repository.
            Improvements and contributions are highly appreciated!</p>
            <br />
            <p>Alexander Belski 2025</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )};

export default About;
