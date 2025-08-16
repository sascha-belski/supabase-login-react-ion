import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonMenuToggle } from '@ionic/react';

import type { Session } from '@supabase/supabase-js';

interface AppMenuProps {
  session: Session | null;
}

const AppMenu: React.FC<AppMenuProps> = ({ session }) => {
  //console.log('from AppMenu session='+session)
  return (
    <IonMenu contentId="main-content" side="start">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {!session ?
            <>
              <IonMenuToggle>
                <IonItem routerLink="/signin" routerDirection="none" detail={false}>
                  <IonLabel>Sign in</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </>
            :
            <>
              <IonMenuToggle>
                <IonItem routerLink="/logout" routerDirection="none" detail={false}>
                  <IonLabel>Sign out</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/about" routerDirection="none" detail={false}>
                  <IonLabel>About</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </>
          }
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
