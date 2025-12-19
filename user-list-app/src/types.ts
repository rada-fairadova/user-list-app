export interface User {
    id: number;
    name: string;
  }
  
  export interface UserDetails {
    id: number;
    name: string;
    avatar: string;
    details: {
      city: string;
      company: string;
      position: string;
    };
  }
  
  export interface ListProps {
    users: User[];
    selectedUserId: number | null;
    onSelectUser: (user: User) => void;
  }
  
  export interface DetailsProps {
    info: User | null;
  }
  
  export interface LoadingSpinnerProps {
    message?: string;
  }
  
  export interface ErrorMessageProps {
    message: string;
    onRetry?: () => void;
  }