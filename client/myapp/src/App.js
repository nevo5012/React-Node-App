import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminMenuComp from './Components/admin/pages/Dashboard/adminMenu.js';
import FooterComp from './Components/footer.jsx';
import MenuComp from './Components/menu.jsx';
import './App.css';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifyAuthContainer, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';
import { I18n } from "aws-amplify";
import { Translations } from "@aws-amplify/ui-components";

I18n.putVocabulariesForLanguage("he", {
  [Translations.NO_ACCOUNT_TEXT]: "אין לך חשבון?",
  [Translations.CREATE_ACCOUNT_TEXT]: "יצירת חשבון",
  [Translations.FORGOT_PASSWORD_TEXT]: "שכחת סיסמה?",
  [Translations.RESET_PASSWORD_TEXT]: "אפס סיסמה",
  [Translations.SIGN_UP_HAVE_ACCOUNT_TEXT]: "יש לך כבר חשבון?",
  [Translations.SIGN_IN_TEXT]: "לחץ כאן"
});
I18n.setLanguage("he");

const App = () => {

  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div dir="rtl" style={{ backgroundColor: "#f2f2f2", }} >
      <BrowserRouter>
        <MenuComp />
        {/* <AdminMenuComp/> */}
      <FooterComp />
      </BrowserRouter>
      <br />
    </div>
  ) : (
    <AmplifyAuthContainer>
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          headerText="יצירת משתמש חדש"
          submitButtonText="צור חשבון"
          formFields={[
            {
              type: "username",
              label: "שם משתמש",
              placeholder: "הכנס את שם המשתמש שלך",
              inputProps: { required: true, autocomplete: "username" },
            },
            {
              type: "email",
              label: "אימייל",
              placeholder: "כתובת המייל שלך",
              inputProps: { required: true, autocomplete: "email" },
            },
            {
              type: "password",
              label: "סיסמה",
              placeholder: "סיסמה",
              inputProps: { required: true, autocomplete: "new-password" },
            },
            {
              type: "given_name",
              label: "שם פרטי",
              inputProps: { required: true },
            },
            {
              type: "family_name",
              label: "שם משפחה",
              inputProps: { required: true },
            },
            {
              type: "address",
              label: "כתובת מגורים",
              placeholder: "כתובת למשלוח החבילות",
              inputProps: { required: true },
            },
            {
              type: "phone_number",
              label: "מספר טלפון",
              placeholder: "טלפון ליצירת קשר",
              dialCode: "+972",
              inputProps: { required: true }
            },
          ]}
        />
        <AmplifySignIn
          slot="sign-in"
          usernameAlias="email"
          headerText="התחברות למערכת"
          submitButtonText="התחבר"
          formFields={[
            {
              type: "email",
              label: "אימייל",
              placeholder: "כתובת המייל שלך"
            },
            {
              type: "password",
              label: "סיסמה",
              placeholder: "סיסמה"
            }]}
        >
        </AmplifySignIn>
      </AmplifyAuthenticator>
    </AmplifyAuthContainer>
  );
}

export default App;