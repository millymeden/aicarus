export default function Visual() {
  return (
    <>
      {/* Page header */}
      <div>
        <div className="kicker">Situational awareness</div>
        <h1 className="h1">Where Are We Now?</h1>
        <p className="lead">
          A continuously updated visual overview of key developments shaping the trajectory of advanced AI.
        </p>
        <div className="divider" />
      </div>

      {/* Intro copy */}
      <div className="space-y-6 text-gray-700 leading-7">
        <p>
          This page will track major technical, political, and strategic shifts
          in AI development — helping you build an intuitive picture of where we
          currently stand and how quickly the landscape is moving.
        </p>

        <p>
          We are developing an interactive system that will allow you to explore
          how changes in capabilities, governance, compute, and other pressures
          are shaping the overall risk picture.
        </p>
      </div>

      {/* Future visualization placeholder */}
      <div className="mt-12">
        <div className="panel p-10 text-center">
          <div className="text-sm font-medium text-gray-500">
            Interactive visualization in development
          </div>
          <div className="mt-2 text-gray-400">
            This section will soon display a live, rewindable view of key AI developments.
          </div>
        </div>
      </div>
    </>
  );
}