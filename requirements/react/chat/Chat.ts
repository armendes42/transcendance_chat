import { socket } from "./main";

interface User {
  id: string;
  name: string;
}

interface Message {
  text: string;
  senderId: string;
}

export class Chat {
  private users: User[] = [];
  private messages: Record<string, string[]> = {};
  private activeChatId: string | null = null;
  private currentUser: User;
  private $chat: HTMLElement;
  private $usersList: HTMLElement;
  private $currentUser: HTMLElement;
  private $textInput: HTMLInputElement;
  private $messagesList: HTMLElement;

  constructor({ currentUser }: { currentUser: User }) {
    this.currentUser = currentUser;
    this.initializeChat();
    this.initializeListeners();
  }

  private initializeListeners(): void {
    socket.on("users-changed", (users: User[]) => {
      this.renderUsers(users);
    });

    socket.on("new-chat-message", (message: Message) => {
      this.addMessage(message.text, message.senderId);
      if (message.senderId === this.activeChatId) {
        this.renderMessages(message.senderId);
      } else {
        this.showNewMessageNotification(message.senderId);
      }
    });
  }

  private showNewMessageNotification(senderId: string): void {
    this.$usersList
      .querySelector(`div[data-id="${senderId}"]`)!
      .classList.add("has-new-notification");
  }

  private async initializeChat(): Promise<void> {
    this.$chat = document.querySelector(".chat") as HTMLElement;
    this.$usersList = this.$chat.querySelector(".users-list") as HTMLElement;
    this.$currentUser = this.$chat.querySelector(".current-user") as HTMLElement;
    this.$textInput = this.$chat.querySelector("input") as HTMLInputElement;
    this.$messagesList = this.$chat.querySelector(".messages-list") as HTMLElement;

    this.$chat.classList.remove("hidden");

    this.$currentUser.innerText = `Logged in as ${this.currentUser.name}`;

    const users = await this.fetchUsers();
    this.renderUsers(users);
  }

  private renderUsers(users: User[]): void {
    this.users = users.filter((user) => user.id !== socket.id);

    this.$usersList.innerHTML = "";
    const $users = this.users.map((user) => {
      const $user = document.createElement("div");
      $user.innerText = user.name;
      $user.dataset.id = user.id;
      return $user;
    });
    this.$usersList.append(...$users);
    this.initializeUsersListeners($users);
  }

  private initializeUsersListeners($users: HTMLElement[]): void {
    $users.forEach(($userElement) => {
      $userElement.addEventListener("click", () => {
        this.activateChat($userElement);
      });
    });
  }

  private activateChat($userElement: HTMLElement): void {
    const userId: string = $userElement.dataset.id ? $userElement.dataset.id : "";

    if (this.activeChatId) {
      this.$usersList
        .querySelector(`div[data-id="${this.activeChatId}"]`)!
        .classList.remove("active");
    }

    this.$usersList
      .querySelector(`div[data-id="${userId}"]`)!
      .classList.remove("has-new-notification");

    this.activeChatId = userId;
    $userElement.classList.add("active");

    this.$textInput.classList.remove("hidden");

    this.renderMessages(userId);

    this.$textInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        const message: Message = {
          text: this.$textInput.value,
          senderId: this.currentUser.id,
        };
        socket.emit("new-chat-message", message);
        this.addMessage(message.text, message.senderId);
        this.renderMessages(message.senderId);
        this.$textInput.value = "";
      }
    });
  }

  addMessage(text: string, userId: string): void {
    if (!this.messages[userId]) {
      this.messages[userId] = [];
    }
    this.messages[userId].push(text);
  }

  renderMessages(userId: string): void {
    this.$messagesList.innerHTML = "";
  
    if (!this.messages[userId]) {
      this.messages[userId] = [];
    }
    const $messages = this.messages[userId].map((message) => {
      const $message = document.createElement("div");
      $message.innerText = message;
      return $message;
    });
    this.$messagesList.append(...$messages);
  }
  
  async fetchUsers(): Promise<User[]> {
    const res = await fetch("/users");
    return await res.json();
  }
}