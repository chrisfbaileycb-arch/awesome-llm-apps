import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">404 - Not Found</h2>
        <p className="text-muted-foreground">The requested page or app could not be found.</p>
        <Link href="/" className="text-primary underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
