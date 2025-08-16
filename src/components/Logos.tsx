import type { Session } from '@supabase/supabase-js';
import { IonTitle, IonGrid, IonRow, IonCol } from '@ionic/react';

import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import supabaseLogo from '../assets/supabase-logo.svg';

import { IonIcon } from '@ionic/react';
import { logoIonic, personOutline } from 'ionicons/icons';

type LogosProps = {
  title: string;
  session?: Session | null;
};

const Logos: React.FC<LogosProps> = ({ title, session }) => {

  return (
    <IonTitle>
      <IonGrid>
         <IonRow>
            <IonCol>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span>{title}</span>
                <span>
                  {session && <IonIcon icon={personOutline} color="primary" style={{ cursor: 'pointer' }} />}
                </span>
                <span style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                  <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" style={{ maxHeight: '24px' }} />
                  </a>
                  <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" style={{ maxHeight: '24px' }} />
                  </a>
                  <a href="https://ionicframework.com" target="_blank" rel="noopener noreferrer">
                    <IonIcon icon={logoIonic} color="primary"></IonIcon>
                  </a>
                  <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer">
                    <img src={supabaseLogo} className="logo supabase" alt="Supabase logo" style={{ maxHeight: '24px' }} />
                  </a>
                </span>
              </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonTitle>
  );
};

export default Logos;
