import { io } from 'socket.io-client';
import { WelcomeScreen } from './WelcomeScreen';

export const socket = io();
new WelcomeScreen();
