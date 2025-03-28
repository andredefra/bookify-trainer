
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface DeleteAccountSectionProps {
  onDeleteAccount: () => void;
}

export function DeleteAccountSection({ onDeleteAccount }: DeleteAccountSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Account Management</h3>
      <p className="text-sm text-muted-foreground">Manage your account status and data.</p>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-md flex items-start">
                  <AlertCircle className="text-amber-500 h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-amber-800">
                    If you have active clients, they will lose access to the programs you've created for them.
                  </span>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDeleteAccount}>Delete Account</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
