class Chat {
    users = [];

    constructor({currentUser}) {
        this.currentUser = currentUser;
        this.initializeChat();
        this.initializeListeners();
    }

    initializeListeners() {
        socket.on("user-changed", users => {
            this.renderUsers(users);
        });
    }

    async initializeChat() {
        this.$chat = document.querySelector(".chat");
        this.$usersList = this.$chat.querySelector(".users-list");
        this.$currentUser = this.$chat.querySelector(".current-user");
        this.$textInput = this.$chat.querySelector("input");
        this.$messagesList = this.$chat.querySelector(".messages-list");

        this.$chat.classList.remove("hidden");
        this.$currentUser.innerText = `Logged in as ${this.currentUser.name}`;
    
        const users = await this.fetchUsers();

        console.log("users", users);
        this.renderUsers(users);
    }

    renderUsers(users) {
        this.users = users.filter(user => user.id !== socket.id);

        this.$usersList.innerHTML = "";
        const $users = this.users.map(user => {
            const $user = document.createElement("div");
            $user.innerText = user.name;
            $user.dataset.id = user.id;
            return $user;
        });
        this.$usersList.append(...$users);
        // this.initializeUsersListeners($users);
    }

    // initializeUsersListeners($users) {
    //     $users.forEach($userElement => {
    //         $userElement.addEventListener("click", () => {
    //             console.log($userElement);
    //             this.activateChat($userElement);
    //         });
    //     });
    // }

    async fetchUsers() {
        const res = await fetch("/users");
        return await res.json();
    }
}