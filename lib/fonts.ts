import { Cinzel } from "next/font/google";

// Roman inscription-style capitals for the "Aicarus" wordmark, echoing the
// classical Icarus imagery in the logo. Cinzel has no lowercase: "Aicarus"
// renders as a tall A followed by small capitals, echoing the big A in the logo.
export const wordmarkFont = Cinzel({
  subsets: ["latin"],
  weight: ["500"],
});
