import { SetupApplication } from './app';

class Server{
  static start(): void {
    const applcation = new SetupApplication(3000);
    applcation.init();
    applcation.start();
  }
}

Server.start();