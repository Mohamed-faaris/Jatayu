import { Textarea } from "@/components/ui/textarea"

function App() {
  return (
    <div className={"flex flex-col items-center justify-center h-dvh"}>
        <h1 className={"text-2xl font-bold"}>Job Description</h1>
      <Textarea
          className={"w-10/12"}
          placeholder="Type your message here."
      />
    </div>
  );
}

export default App;
