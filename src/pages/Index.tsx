import AprilChat from "@/components/AprilChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">Welcome to AirCare</h1>
        <AprilChat />
      </div>
    </div>
  );
};

export default Index;
