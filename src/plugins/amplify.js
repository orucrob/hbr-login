import Vue from 'vue';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'eu-west-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-west-1_hwx4ceEkM',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '1t1a1sqj2u33itbqup8tfptron'
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    //mandatorySignIn: false,
    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    //authenticationFlowType: 'USER_PASSWORD_AUTH'
  },
  API: {
    endpoints: [
      {
        name: 'BikeAPI',
        endpoint: 'https://8rbjufwlj3.execute-api.eu-west-1.amazonaws.com/dev',
        custom_header: async () => {
          // return { Authorization : 'token' }
          // Alternatively, with Cognito User Pools use this:
          return {
            Authorization: `Bearer ${(await Amplify.Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`
          };
        }
      }
    ]
  }
});

Vue.use(AmplifyPlugin, AmplifyModules);
