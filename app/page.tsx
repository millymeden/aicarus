import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <div className="kicker">Aicarus</div>
        <h1 className="h1">AI safety, clearly explained.</h1>
        <p className="lead">
          Explaining technical progress, governance, and geopolitical dynamics
          in a way anyone can understand, without jargon.
        </p>

        <div className="divider" />
      </div>

      <div className="space-y-6 text-gray-700 leading-7">
        <p>
          Aicarus is an independent initiative that helps the public keep up
          with fast-moving AI developments and understand why safety matters.
        </p>

        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
            What you will find here
          </h2>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li>
              <span className="font-medium text-gray-900">The Basics: </span>{" "}
              The foundational knowledge you need to understand AI.
            </li>
            <li>
              <span className="font-medium text-gray-900">Making Sense of AI?</span>{" "}
              Explainers, analysis, and interviews.
            </li>
            
            <li>
              <span className="font-medium text-gray-900">Where Are We Now?</span>{" "}
              A visual overview currently in development.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}