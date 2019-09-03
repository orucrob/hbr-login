<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about" v-if="user">About</router-link>|
            <router-link to="/signout" v-if="user">Signout</router-link>
            <router-link to="/login" v-else>Login</router-link>
        </div>
        <router-view />
        <vue-snotify />
        <hr />
        <div v-if="user" class="dev-info">
            <div>LOGGED IN</div>
            <div>idToken: {{idToken}}</div>
            <div>accessToken: {{accessToken}}</div>
        </div>
        <button type="button" @click="onAdminSync">Admin Sync</button>
        <button type="button" @click="onMyStatus">My Status</button>
        <button type="button" @click="onAllUsers">All Users</button>for lobby:
        <input type="text" v-model="allUsersLobby" />
        <pre>Sync: 
            {{sync}}</pre>
        <pre>MyStatus: 
            {{myStatus}}</pre>
        <pre>All Users: 
            {{allUsers}}</pre>
        <hr />Locks:
        <button type="button" @click="onAllLocks">Get</button>for lobby:
        <input type="text" v-model="allLocksLobby" />
        <pre>{{locksResponse}}</pre>
        <hr />Lock:
        <input type="text" v-model="lock" />
        <button type="button" @click="onGetLock">Get</button>
        <button type="button" @click="onUnlockTake">Unlock to Take</button>
        <button type="button" @click="onUnlockReturn">Unlock to Return</button>
        <pre>Lock Response: {{lockResponse}}</pre>
    </div>
</template>

<script>
const APINAME = "BikeAPI";

export default {
    name: "app",
    data: () => {
        return {
            user: undefined,
            idToken: undefined,
            accessToken: undefined,
            myStatus: undefined,
            allUsers: undefined,
            sync: undefined,
            allUsersLobby: undefined,
            lock: undefined,
            allLocksLobby: undefined,
            locksResponse: undefined,
            lockResponse: undefined
        };
    },
    beforeMount: async function() {
        try {
            this.user = await this.$Amplify.Auth.currentAuthenticatedUser();
            this.session = await this.$Amplify.Auth.currentSession();
            if (this.session) {
                this.idToken = this.session.idToken.jwtToken;
                this.accessToken = this.session.accessToken.jwtToken;
            } else {
                this.idToken = undefined;
                this.accessToken = undefined;
            }
            console.log("app:gotuser", this.session);
        } catch (e) {
            console.log("app:gotuser/session err", e);
            this.user = undefined;
        }
    },
    methods: {
        async onMyStatus() {
            try {
                this.myStatus = await this.$Amplify.API.get(
                    APINAME,
                    "/mystatus"
                );
            } catch (err) {
                this.myStatus = JSON.stringify(
                    (err && err.response && err.response.data) || err,
                    null,
                    2
                );
                console.log("mystatus error:", this.myStatus);
            }
        },
        async onAdminSync() {
            try {
                this.sync = await this.$Amplify.API.get(APINAME, "/sync");
            } catch (err) {
                this.sync = JSON.stringify(
                    (err && err.response && err.response.data) || err,
                    null,
                    2
                );
                console.log("sync error:", this.sync);
            }
        },
        async onAllUsers() {
            try {
                this.allUsers = await this.$Amplify.API.get(
                    APINAME,
                    `/users?lobby=${this.allUsersLobby}`
                );
            } catch (err) {
                this.allUsers = JSON.stringify(
                    (err && err.response && err.response.data) || err,
                    null,
                    2
                );
                console.log("all users error:", this.allUsers);
            }
        },
        async onAllLocks() {
            try {
                this.locksResponse = await this.$Amplify.API.get(
                    APINAME,
                    `/locks?lobby=${this.allLocksLobby}`
                );
            } catch (err) {
                this.locksResponse = JSON.stringify(
                    (err && err.response && err.response.data) || err,
                    null,
                    2
                );
                console.log("all locks error:", this.locksResponse);
            }
        },
        async onGetLock() {
            try {
                this.lockResponse = await this.$Amplify.API.get(
                    APINAME,
                    `/locks/${this.lock}`
                );
            } catch (err) {
                this.lockResponse = JSON.stringify(
                    (err && err.response && err.response.data) || err,
                    null,
                    2
                );
                console.log("Get Lock error:", this.lockResponse);
            }
        },
        async onUnlockTake() {
            try {
                this.lockResponse = await this.$Amplify.API.get(
                    APINAME,
                    `/locks/${this.lock}/unlocktotake`
                );
            } catch (err) {
                this.lockResponse = JSON.stringify(
                    (err && err.response && err.response.data) || err,
                    null,
                    2
                );
                console.log("unlock to take error:", this.lockResponse);
            }
        },
        async onUnlockReturn() {
            try {
                this.lockResponse = await this.$Amplify.API.get(
                    APINAME,
                    `/locks/${this.lock}/unlocktoreturn`
                );
            } catch (err) {
                this.lockResponse = JSON.stringify(
                    (err && err.response && err.response.data) || err,
                    null,
                    2
                );
                console.log("unlock to return error:", err.response.data);
            }
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