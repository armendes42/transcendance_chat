import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    login() {
        return { msg: "I am logged in" };
    }
}