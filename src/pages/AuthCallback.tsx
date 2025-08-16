import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText } from '@ionic/react';

interface AuthCallbackProps {
  setFirstTimeLogin: (value: boolean) => void;
}

const AuthCallback: React.FC<AuthCallbackProps> = ({ setFirstTimeLogin }) => {
  const history = useHistory();
  const [countdown, setCountdown] = useState(10);
  const location = useLocation();

  useEffect(() => {
        // Run every time /logout route is entered
    if (location.pathname !== '/auth/callback') return;
    // Countdown timer
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 30 seconds
    const timeout = setTimeout(() => {
      setFirstTimeLogin(true);
      history.push('/signin');
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [location, history, setFirstTimeLogin]);

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IonCard style={{ textAlign: 'center', maxWidth: '400px' }}>
            <IonCardHeader>
              <IonCardTitle>🎉 Welcome aboard!</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText color="medium">
                Your email has been confirmed successfully.
              </IonText>
              <p style={{ marginTop: '1em', fontWeight: 'bold' }}>
                Redirecting to login in {countdown} {countdown === 1 ? 'second' : 'seconds'}…
              </p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthCallback;
