<template>
    <div class="col-sm-12 col-md-6 col-lg-3 col-lg-2">
        <form-input label="Email" v-model="username"></form-input>

        <form-input label="Password" v-model="password" type="password"></form-input>

        <div class="commands">
            <router-link to="/signup">SignUp</router-link>
            <button @click.prevent="signIn">Login</button>
        </div>
    </div>
</template>

<script>
import FormInput from "@/components/FormInput";

export default {
    name: "Login",
    data: () => {
        return {
            user: undefined,
            username: "",
            password: ""
        };
    },
    components: {
        FormInput
    },
    methods: {
        signIn() {
            let self = this;
            this.$Amplify.Auth.signIn(this.username, this.password)
                .then(user => {
                    this.$snotify.success("Succesfully signed in!");
                    self.user = user;
                    self.$router.push("/");
                })
                .catch(err => {
                    this.$snotify.error(
                        "We can't seem to log you in",
                        "Uh oh.."
                    );
                    console.log(err);
                });
        },
        signOut() {
            this.user = undefined;
            this.$Amplify.Auth.signOut()
                .then(data => console.log(data))
                .catch(err => console.log(err));
        }
    }
};
</script>
<style scoped>
.commands > * {
    margin: 1em;
}
</style>