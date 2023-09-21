import GitHubUserInfo from "./github-user-info.js";

// Create a Vue app
const app = Vue.createApp({
    data() {
        return {
            username: "",
        };
    },
    methods: {
        async searchUser() {
            // Pass the username to the GitHubUserInfo component
            this.$refs.userInfo.username = this.username;
            // Trigger the searchUser method in the component
            await this.$refs.userInfo.searchUser();
        },
    },
});

// Register the GitHubUserInfo component
app.component("github-user-info", GitHubUserInfo);

app.mount("#app");
