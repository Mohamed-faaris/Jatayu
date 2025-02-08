import { Textarea } from "@/components/ui/textarea"
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

function App() {
    const  [jobDescription,setJobDescription] = useState("");
  return (
    <div className={"flex flex-col items-center justify-center h-dvh gap-2"}>
        <h1 className={"text-2xl font-bold"}>Job Description</h1>
      <Textarea
          className={"w-10/12 h-32 resize-none"}
          placeholder="Type your message here."
          value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
      />
    <Button className={"mt-4"}>Submit</Button>
    </div>
  );
}

export default App;
