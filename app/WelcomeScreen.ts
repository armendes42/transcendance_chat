// class WelcomeScreen {
//     constructor() {
//         this.$welcomeScreen = document.querySelector(".welcome-screen");
//         this.$loginButton = this.$welcomeScreen.querySelector("button");
//         this.$input = this.$welcomeScreen.querySelector("input");

//         this.initializeListeners();
//     }

//     initializeListeners() {
//         this.$loginButton.addEventListener("click", () => {
//             if (this.$input.value === "") {
//                 return;
//             }

//             const currentUser = {
//                 name: this.$input.value
//             };
//             socket.emit("user-connected", currentUser);
//             this.$welcomeScreen.classList.add("hidden");
//             new Chat({currentUser});
//         });
//     }
// }

import { socket } from "./main";
import { Chat } from "./Chat"

export class WelcomeScreen {
    private $welcomeScreen: HTMLElement;
    private $loginButton: HTMLButtonElement;
    private $input: HTMLInputElement;

    constructor() {
        this.$welcomeScreen = document.querySelector(".welcome-screen")!;
        this.$loginButton = this.$welcomeScreen.querySelector("button")!;
        this.$input = this.$welcomeScreen.querySelector("input")!;

        this.initializeListeners();
    }

    private initializeListeners(): void {
        this.$loginButton.addEventListener("click", () => {
            if (this.$input.value === "") {
                return;
            }

            const currentUser = {
                name: this.$input.value,
                id: "",
            };
            socket.emit("user-connected", currentUser);
            this.$welcomeScreen.classList.add("hidden");
            new Chat({currentUser});
        });
    }
}
