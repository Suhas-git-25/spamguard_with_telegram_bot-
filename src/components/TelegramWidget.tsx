import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export function TelegramWidget() {
  useEffect(() => {
    // Add Telegram widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "TELE_89_BOT");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;
    
    // Add the auth function to window
    (window as any).onTelegramAuth = function(user: any) {
      alert(`Logged in as ${user.first_name} ${user.last_name} (${user.id}${user.username ? ', @' + user.username : ''})`);
    };
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
      delete (window as any).onTelegramAuth;
    };
  }, []);

  const handleTelegramRedirect = () => {
    window.open("https://t.me/TELE_89_BOT", "_blank");
  };

  return (
    <div className="space-y-4">
      <div className="telegram-widget" id="telegram-login-widget" />
      <Button 
        variant="telegram" 
        size="lg" 
        onClick={handleTelegramRedirect}
        className="w-full"
      >
        <MessageSquare className="h-5 w-5" />
        Open Telegram Spam Detection
      </Button>
    </div>
  );
}