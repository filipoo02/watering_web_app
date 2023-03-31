import { CurrentUserInterface } from 'src/app/shared/types/current-user.interface';

export interface AuthStateInterface {
  isLoggedIn: boolean;
  currentUser: CurrentUserInterface | null;
  isSubmitting: boolean;
}
