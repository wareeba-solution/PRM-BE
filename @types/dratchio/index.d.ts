// // BackEnd/@types/dratchio/index.d.ts
// import { User } from '../../src/modules/users/entities/user.entity'
//
// declare module 'dratchio' {
//     export class DratchioClient {
//       constructor(config: any);
//       on(event: string, callback: Function): DratchioClient;
//       register(): Promise<void>;
//       call(options: { to: string, from: string }): Promise<{
//         uuid: string;
//         answer: () => void;
//         hangup: () => void;
//       }>;
//     }
//   }

// @types/express/index.d.ts
import { User } from '../../src/modules/users/entities/user.entity';

declare global {
  namespace Express {
    // Extend the Request interface
    interface Request {
      user?: User;
    }
  }
}

// This empty export is required to make this a module
export {};