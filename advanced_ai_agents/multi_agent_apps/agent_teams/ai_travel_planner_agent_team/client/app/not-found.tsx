import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
          <Compass className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">App or Page Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The requested agent or template could not be located.
        </p>
        <Link href="/apps/catalog">
          <Button className="bg-primary">Browse 100+ Catalog</Button>
        </Link>
      </div>
    </div>
  );
}
