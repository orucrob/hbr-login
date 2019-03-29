<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about" v-if="user">About</router-link>|
            <router-link to="/signout" v-if="user">Signout</router-link>
            <router-link to="/login" v-else>Login</router-link>
        </div>
        <router-view/>
        <vue-snotify/>
        <hr>
        <div v-if="user" class="dev-info">
            <div>LOGGED IN</div>
            <div>idToken: {{idToken}}</div>
            <div>accessToken: {{accessToken}}</div>
        </div>
    </div>
</template>

<script>

export default {
    name: "app",
    data: () => {
        return {
            user: undefined,
            idToken: undefined,
            accessToken: undefined
        };
    },
    beforeMount: async function() {
        try {
            this.user = await this.$Amplify.Auth.currentAuthenticatedUser()
            this.session = await this.$Amplify.Auth.currentSession()
            if(this.session){
                this.idToken = this.session.idToken.jwtToken
                this.accessToken = this.session.accessToken.jwtToken
            }else{
                this.idToken = undefined
                this.accessToken = undefined
            }
            console.log("app:gotuser", this.session);
        } catch (e) {
            console.log("app:gotuser/session err", e);
            this.user = undefined;
        }
    }
};
</script>
<style lang="scss">
@import "~vue-snotify/styles/simple";

.dev-info {
    font-size: 8px;
    font-family: monospace;
}
</style>