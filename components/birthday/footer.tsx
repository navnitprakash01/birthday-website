import { Heart } from "lucide-react";

export function BirthdayFooter() {
  return (
    <footer className="py-10 text-center">
      <p className="flex items-center justify-center gap-1.5 font-handwritten text-lg text-muted-foreground">
        {"Made with "}
        <Heart className="h-4 w-4 fill-primary text-primary" aria-label="love" />
        {" by Your Sibling"}
      </p>
    </footer>
  );
}
