export default function About() {
  return (
    <>
      {/* Page header */}
      <div>
        <h1 className="h1">About Aicarus</h1>
        <p className="lead">
          Explaining AI safety and tracking key developments in a way anyone can understand.
        </p>
        <div className="divider" />
      </div>

      {/* Page content */}
      <div className="space-y-4 text-gray-700 leading-7">
        <p>
          Aicarus is an independent initiative focused on making developments in
          artificial intelligence understandable to a broad audience.
        </p>

        <p>
          We translate technical progress, policy shifts, and geopolitical
          dynamics into clear, accessible analysis — helping more people build an
          accurate picture of where AI is heading.
        </p>
      </div>
    </>
  );
}