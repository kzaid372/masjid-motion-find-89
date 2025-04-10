
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AuthButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  fullWidth?: boolean;
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  variant = 'outline',
  size = 'default',
  fullWidth = false,
  className = '',
}) => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return (
      <Button variant={variant} size={size} disabled className={className}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading
      </Button>
    );
  }

  if (!user) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        onClick={signInWithGoogle} 
        className={`${fullWidth ? 'w-full' : ''} ${className}`}
      >
        <LogIn className="mr-2 h-4 w-4" />
        Sign in with Google
      </Button>
    );
  }

  // We need to handle potential null values from Firebase
  const displayName = user.displayName || 'User';
  const userInitial = displayName ? displayName.charAt(0) : 'U';
  const email = user.email || 'No email provided';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || undefined} alt={displayName} />
            <AvatarFallback className="bg-masjid-green text-white">
              {userInitial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>{displayName}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center text-xs text-muted-foreground">
          <span>{email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center text-destructive focus:text-destructive" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
