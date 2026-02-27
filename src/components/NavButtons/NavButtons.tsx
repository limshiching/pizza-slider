export function NavButtons({
  prev,
  next,
}: {
  prev: () => void;
  next: () => void;
}) {
  return (
    <div className="navBtns">
      <button className="navBtn leftBtn" onClick={prev} aria-label="Previous">
        ‹
      </button>
      <button className="navBtn rightBtn" onClick={next} aria-label="Next">
        ›
      </button>
    </div>
  );
}
